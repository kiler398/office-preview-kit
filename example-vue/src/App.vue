<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue';
import {
  OfficeViewer,
  type OfficeViewerOptions,
  type LoadedInfo,
  type AnnotationTool,
  type ViewerEventMap,
  type PageOverlay,
  createDocumentRenderer,
} from 'office-preview-kit/vue';
// Serve the pdf.js worker from our own bundle (keeps PDF parsing off the main thread)
import pdfWorkerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// handy for trying the standalone API from DevTools: await __okp.createDocumentRenderer('/samples/…')
(window as any).__okp = { createDocumentRenderer };

const samples = [
  { group: 'Word / WPS 文字', items: ['报告示例.docx', '报告示例.doc', '简单文档.doc', 'WPS文字示例.wps', 'WPS文字OOXML.wps', '报告示例.odt'] },
  { group: 'Excel / WPS 表格', items: ['销售数据.xlsx', '销售数据.xls', 'WPS表格示例.et', '客户清单.csv'] },
  { group: 'PPT / WPS 演示', items: ['产品介绍.pptx', '产品介绍.ppt', '简单演示.ppt', 'WPS演示示例.dps'] },
  { group: 'PDF / 其他', items: ['报告示例.pdf', '说明.md'] },
];

const src = shallowRef<string | File | null>(`/samples/${encodeURIComponent('报告示例.docx')}`);
const fileName = ref('报告示例.docx');
const phone = ref(false);
const log = ref<string[]>([]);
const viewer = ref<InstanceType<typeof OfficeViewer>>();

// ---- page state, driven by pdf.js-style events
const page = ref(0);
const pages = ref(0);
const scale = ref(1);
const isSheet = ref(false);
const pageInput = ref('');

// ---- drawing state
const tool = ref<AnnotationTool>('none');
const color = ref('#e5484d');
const annoCount = ref(0);
const canDraw = computed(() => pages.value > 0 && !isSheet.value);

const options: OfficeViewerOptions = {
  pdfWorkerSrc,
  pdfCMapUrl: '/pdfjs/cmaps/',
  pdfStandardFontDataUrl: '/pdfjs/standard_fonts/',
  // Fallback for formats the browser can't render (ODF, WPS proprietary binary, RTF …):
  async convert({ data, fileName }) {
    const res = await fetch(`/api/convert?to=pdf&name=${encodeURIComponent(fileName)}`, { method: 'POST', body: data });
    if (!res.ok) throw new Error(await res.text());
    return { data: await res.arrayBuffer(), fileName: decodeURIComponent(res.headers.get('X-File-Name') ?? 'converted.pdf') };
  },
};

// ---- render-to-image state
const watermark = ref(false);
const pageTag = ref(false);
const preview = ref<{ url: string; title: string } | null>(null);
const thumbs = ref<{ n: number; url: string }[]>([]);
const busy = ref('');

const push = (s: string) => { log.value.unshift(s); if (log.value.length > 40) log.value.length = 40; };

function pick(name: string) { fileName.value = name; src.value = `/samples/${encodeURIComponent(name)}`; }
function onUpload(e: Event) {
  const f = (e.target as HTMLInputElement).files?.[0];
  if (!f) return;
  fileName.value = f.name;
  src.value = f;
  (e.target as HTMLInputElement).value = '';
}

// ---- event handlers (same names as pdf.js EventBus)
function onDocumentLoaded(e: ViewerEventMap['documentloaded']) {
  isSheet.value = e.detect.family === 'cell';
  tool.value = 'none';
  push(`documentloaded · ${e.fileName} (${e.detect.format}${e.converted ? '，已转换' : ''})`);
}
function onPagesLoaded(e: ViewerEventMap['pagesloaded']) {
  pages.value = e.pagesCount;
  push(`pagesloaded · ${e.pagesCount}`);
  void buildThumbs();
}
function onPageChanging(e: ViewerEventMap['pagechanging']) {
  page.value = e.pageNumber;
  pageInput.value = String(e.pageNumber);
  push(`pagechanging · ${e.previous} → ${e.pageNumber}`);
}
function onScaleChanging(e: ViewerEventMap['scalechanging']) { scale.value = e.scale; }
function onAnnotationsChanged(e: ViewerEventMap['annotationschanged']) { annoCount.value = e.annotations.length; }
function onAnnotationClick(e: ViewerEventMap['annotationclick']) {
  push(`annotationclick · ${e.annotation.type} @ 第 ${e.annotation.pageNumber} 页`);
}
function onLoad(i: LoadedInfo) { void i; }
function onError(e: Error) { push(`✘ ${fileName.value}：${e.message}`); }

// ---- page navigation via the pdf.js-like API
function go() {
  const n = parseInt(pageInput.value, 10);
  if (viewer.value && n) viewer.value.currentPageNumber = n;
}

// ---- drawing
function setTool(t: AnnotationTool) {
  tool.value = tool.value === t ? 'none' : t;
  viewer.value?.setTool(tool.value, { color: t === 'highlighter' || t === 'highlight' ? '#ffd400' : color.value });
}
function stampReviewed() {
  // programmatic annotations: a red "已审阅" stamp box on the current page
  const n = viewer.value?.currentPageNumber ?? 1;
  viewer.value?.addAnnotation({ type: 'rect', pageNumber: n, x: 0.66, y: 0.04, width: 0.26, height: 0.07, color: '#d93025', strokeWidth: 4 });
  viewer.value?.addAnnotation({ type: 'text', pageNumber: n, x: 0.685, y: 0.055, text: '已审阅 ✓', color: '#d93025', fontSize: 34 });
}
function exportJson() {
  const json = JSON.stringify(viewer.value?.exportAnnotations() ?? [], null, 2);
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
  a.download = `${fileName.value}.annotations.json`;
  a.click();
}
// ---- 指定页渲染 → 缩略图（off-screen, shares the already-parsed document）
let thumbToken = 0;
async function buildThumbs() {
  const my = ++thumbToken;
  thumbs.value.forEach((t) => URL.revokeObjectURL(t.url));
  thumbs.value = [];
  if (isSheet.value) return;
  for (let n = 1; n <= Math.min(pages.value, 30); n++) {
    try {
      const blob = await viewer.value?.renderPageToImage(n, { width: 120, pixelRatio: 2, annotations: false, overlays: false });
      if (my !== thumbToken || !blob) return;
      thumbs.value.push({ n, url: URL.createObjectURL(blob) });
    } catch (e) { push(`缩略图失败：${(e as Error).message}`); return; }
  }
}

// ---- 当前页 → 图片（含批注 + 浮层）
async function exportCurrent() {
  busy.value = '正在渲染…';
  try {
    const n = viewer.value?.currentPageNumber ?? 1;
    const t0 = performance.now();
    const blob = await viewer.value!.renderPageToImage(n, { scale: 1.5, pixelRatio: 2, ...(isSheet.value ? {} : {}) });
    if (preview.value) URL.revokeObjectURL(preview.value.url);
    preview.value = { url: URL.createObjectURL(blob!), title: `${isSheet.value ? '工作表' : '第'} ${n} ${isSheet.value ? '' : '页'} · ${(blob!.size / 1024).toFixed(0)} KB · ${Math.round(performance.now() - t0)} ms` };
    push(`renderPageToImage · 第 ${n} 页 → ${(blob!.size / 1024).toFixed(0)} KB`);
  } catch (e) { push(`✘ 导出失败：${(e as Error).message}`); }
  busy.value = '';
}
async function exportAll() {
  const list = await viewer.value!.renderPagesToImages('all', { scale: 1, type: 'image/jpeg', quality: 0.85 }, (d, t) => { busy.value = `渲染中 ${d}/${t}`; });
  busy.value = '';
  push(`renderPagesToImages · ${list?.length} 张，共 ${((list ?? []).reduce((s, x) => s + x.blob.size, 0) / 1024).toFixed(0)} KB`);
  list?.forEach(({ pageNumber, blob }) => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = `${fileName.value}-${pageNumber}.jpg`; a.click();
  });
}

// ---- 浮层：水印 + 自定义页眉条（屏幕与导出共用同一个 draw 函数）
function toggleWatermark() {
  watermark.value = !watermark.value;
  viewer.value?.setWatermark(watermark.value ? { text: ['office-preview-kit 内部资料', new Date().toLocaleDateString('zh-CN')], color: 'rgba(200,30,30,0.10)' } : null);
}
const pageTagOverlay: PageOverlay = {
  id: 'page-tag',
  zIndex: 10,
  draw(ctx, { pageNumber, pagesCount, width, mode }) {
    const h = width * 0.03;
    ctx.fillStyle = 'rgba(68,105,149,0.9)';
    ctx.fillRect(width - width * 0.2, 0, width * 0.2, h);
    ctx.fillStyle = '#fff';
    ctx.font = `${h * 0.55}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${mode === 'export' ? '导出' : '预览'} · ${pageNumber}/${pagesCount}`, width - width * 0.1, h / 2);
  },
};
function togglePageTag() {
  pageTag.value = !pageTag.value;
  if (pageTag.value) viewer.value?.addPageOverlay(pageTagOverlay); else viewer.value?.removePageOverlay('page-tag');
}

const tools: { id: AnnotationTool; label: string }[] = [
  { id: 'pen', label: '画笔' },
  { id: 'highlighter', label: '荧光笔' },
  { id: 'rect', label: '矩形' },
  { id: 'highlight', label: '高亮框' },
  { id: 'text', label: '文字' },
  { id: 'eraser', label: '橡皮' },
];
</script>

<template>
  <div class="app">
    <aside class="side">
      <h1>office-preview-kit <small>Vue 3 示例</small></h1>
      <label class="upload">
        打开本地文件…
        <input type="file" @change="onUpload"
          accept=".docx,.doc,.docm,.dotx,.wps,.wpt,.xlsx,.xls,.xlsm,.et,.ett,.csv,.tsv,.pptx,.ppt,.pptm,.ppsx,.dps,.dpt,.pdf,.odt,.ods,.odp,.rtf,.txt,.md,.png,.jpg,.jpeg,.gif,.webp" />
      </label>
      <label class="toggle"><input type="checkbox" v-model="phone" /> 手机尺寸预览</label>
      <nav>
        <section v-for="g in samples" :key="g.group">
          <h2>{{ g.group }}</h2>
          <button v-for="n in g.items" :key="n" :class="{ on: n === fileName && typeof src === 'string' }" @click="pick(n)">{{ n }}</button>
        </section>
      </nav>
      <div class="log">
        <h2>事件日志</h2>
        <div v-for="(l, i) in log" :key="i">{{ l }}</div>
      </div>
    </aside>

    <main class="main">
      <!-- demo toolbar built purely on the public API -->
      <div class="tools">
        <div class="grp">
          <button :disabled="page <= 1" @click="viewer?.previousPage()">‹</button>
          <input class="pg" v-model="pageInput" @keydown.enter="go" />
          <span class="muted">/ {{ pages }}</span>
          <button :disabled="page >= pages" @click="viewer?.nextPage()">›</button>
          <span class="muted">{{ Math.round(scale * 100) }}%</span>
        </div>
        <div class="grp" v-if="canDraw">
          <button v-for="t in tools" :key="t.id" :class="{ on: tool === t.id }" @click="setTool(t.id)">{{ t.label }}</button>
          <input type="color" v-model="color" title="颜色" @change="tool !== 'none' && viewer?.setTool(tool, { color })" />
          <button @click="viewer?.undo()">撤销</button>
          <button @click="stampReviewed">盖章</button>
          <button @click="viewer?.clearAnnotations()">清空</button>
          <button @click="exportJson">导出 JSON（{{ annoCount }}）</button>
        </div>
        <div class="grp muted" v-else-if="isSheet">表格不支持页面绘制层</div>
        <div class="grp" v-if="pages > 0">
          <button @click="exportCurrent">当前页→图片</button>
          <button v-if="!isSheet" @click="exportAll">全部页→JPG</button>
          <button :class="{ on: watermark }" @click="toggleWatermark">水印</button>
          <button :class="{ on: pageTag }" @click="togglePageTag">页码浮层</button>
          <span class="muted">{{ busy }}</span>
        </div>
      </div>

      <div class="body">
      <div class="thumbs" v-if="thumbs.length && !phone">
        <button v-for="t in thumbs" :key="t.n" :class="{ on: t.n === page }" @click="viewer && (viewer.currentPageNumber = t.n)">
          <img :src="t.url" :alt="`第 ${t.n} 页`" /><span>{{ t.n }}</span>
        </button>
      </div>
      <div class="stagebox" :class="{ phone }">
        <div class="frame">
          <OfficeViewer ref="viewer" :src="src" :file-name="fileName" :options="options" locale="zh-CN"
            @load="onLoad" @error="onError"
            @documentloaded="onDocumentLoaded" @pagesloaded="onPagesLoaded" @pagechanging="onPageChanging"
            @scalechanging="onScaleChanging" @annotationschanged="onAnnotationsChanged" @annotationclick="onAnnotationClick" />
        </div>
      </div>
      </div>
      <div class="modal" v-if="preview" @click.self="preview = null">
        <div class="sheet">
          <header><b>导出预览</b><span class="muted">{{ preview.title }}</span>
            <a :href="preview.url" :download="`${fileName}-page.png`">下载</a><button @click="preview = null">关闭</button></header>
          <div class="imgwrap"><img :src="preview.url" /></div>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
html, body, #app { margin: 0; height: 100%; }
body { font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif; background: #f5f6f8; color: #222; }
.app { display: flex; height: 100%; }
.side { width: 260px; flex: none; display: flex; flex-direction: column; gap: 10px; padding: 14px; border-right: 1px solid #e3e5e8; background: #fff; overflow: auto; }
.side h1 { font-size: 16px; margin: 0 0 4px; }
.side h1 small { display: block; font-weight: 400; color: #888; font-size: 12px; margin-top: 2px; }
.side h2 { font-size: 12px; color: #888; font-weight: 500; margin: 10px 0 4px; }
.side nav button { display: block; width: 100%; text-align: left; border: 0; background: none; padding: 6px 8px; border-radius: 6px; font-size: 13px; cursor: pointer; color: #333; }
.side nav button:hover { background: #f0f2f5; }
.side nav button.on { background: #e6eef8; color: #2f5d8c; font-weight: 600; }
.upload { position: relative; display: block; text-align: center; padding: 9px; border-radius: 8px; background: #446995; color: #fff; font-size: 13px; cursor: pointer; }
.upload input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
.toggle { font-size: 13px; color: #555; display: flex; gap: 6px; align-items: center; }
.log { font-size: 11px; color: #666; line-height: 1.6; border-top: 1px solid #eee; padding-top: 4px; word-break: break-all; }
.log h2 { margin-top: 4px; }
.main { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.tools { flex: none; display: flex; flex-wrap: wrap; gap: 8px 16px; align-items: center; padding: 8px 12px; background: #fff; border-bottom: 1px solid #e3e5e8; font-size: 13px; }
.tools .grp { display: flex; gap: 4px; align-items: center; flex-wrap: wrap; }
.tools button { height: 28px; padding: 0 10px; border: 1px solid #d5d8dc; background: #fff; border-radius: 6px; cursor: pointer; font-size: 13px; }
.tools button:disabled { opacity: .4; cursor: default; }
.tools button.on { background: #446995; border-color: #446995; color: #fff; }
.tools .pg { width: 44px; height: 26px; text-align: center; border: 1px solid #d5d8dc; border-radius: 6px; }
.tools input[type=color] { width: 30px; height: 28px; padding: 0; border: 1px solid #d5d8dc; border-radius: 6px; background: none; }
.muted { color: #888; }
.body { flex: 1; min-height: 0; display: flex; }
.thumbs { flex: none; width: 150px; overflow: auto; padding: 10px; background: #eef0f3; border-right: 1px solid #e3e5e8; display: flex; flex-direction: column; gap: 10px; align-items: center; }
.thumbs button { position: relative; border: 2px solid transparent; padding: 0; background: none; cursor: pointer; border-radius: 4px; line-height: 0; }
.thumbs button.on { border-color: #446995; }
.thumbs img { width: 120px; box-shadow: 0 1px 3px rgba(0,0,0,.2); background: #fff; }
.thumbs span { position: absolute; right: 4px; bottom: 4px; line-height: 1; font-size: 11px; background: rgba(0,0,0,.55); color: #fff; padding: 2px 5px; border-radius: 8px; }
.modal { position: fixed; inset: 0; background: rgba(0,0,0,.45); display: flex; align-items: center; justify-content: center; z-index: 50; padding: 24px; }
.modal .sheet { background: #fff; border-radius: 10px; max-width: 92vw; max-height: 92vh; display: flex; flex-direction: column; overflow: hidden; }
.modal header { display: flex; gap: 12px; align-items: center; padding: 10px 14px; border-bottom: 1px solid #eee; font-size: 13px; }
.modal header a, .modal header button { margin-left: auto; font-size: 13px; }
.modal header button { margin-left: 0; height: 28px; padding: 0 10px; border: 1px solid #d5d8dc; background: #fff; border-radius: 6px; cursor: pointer; }
.modal .imgwrap { overflow: auto; background: #e9e9e9; padding: 16px; }
.modal .imgwrap img { display: block; max-width: min(1000px, 86vw); box-shadow: 0 1px 6px rgba(0,0,0,.25); }
.stagebox { flex: 1; min-width: 0; min-height: 0; display: flex; }
.stagebox .frame { flex: 1; min-width: 0; }
.stagebox.phone { align-items: center; justify-content: center; background: #dfe3e8; }
.stagebox.phone .frame { flex: none; width: 390px; height: min(844px, calc(100% - 40px)); border-radius: 28px; overflow: hidden; border: 10px solid #1d1d1f; box-shadow: 0 10px 40px rgba(0,0,0,.25); }
@media (max-width: 760px) {
  .app { flex-direction: column; }
  .side { width: auto; max-height: 30vh; border-right: 0; border-bottom: 1px solid #e3e5e8; }
  .log { display: none; }
  .stagebox.phone .frame { width: 100%; height: 100%; border: 0; border-radius: 0; }
}
</style>
