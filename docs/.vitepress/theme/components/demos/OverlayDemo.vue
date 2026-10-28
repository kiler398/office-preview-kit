<script setup lang="ts">
import { ref } from 'vue';
import type { PageOverlay } from 'office-preview-kit/vue';
import DemoViewer from '../DemoViewer.vue';

const wm = ref(false);
const tag = ref(false);
const out = ref('');
const pageTag: PageOverlay = {
  id: 'page-tag',
  zIndex: 10,
  draw(ctx, { pageNumber, pagesCount, width, mode }) {
    const h = width * 0.03;
    ctx.fillStyle = 'rgba(68,105,149,.9)';
    ctx.fillRect(width * 0.8, 0, width * 0.2, h);
    ctx.fillStyle = '#fff';
    ctx.font = `${h * 0.55}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${mode === 'export' ? '导出' : '预览'} · ${pageNumber}/${pagesCount}`, width * 0.9, h / 2);
  },
};
function toggleWm(v: any) {
  wm.value = !wm.value;
  v?.setWatermark(wm.value ? { text: ['office-preview-kit 内部资料', new Date().toLocaleDateString('zh-CN')], color: 'rgba(200,30,30,.10)' } : null);
}
function toggleTag(v: any) {
  tag.value = !tag.value;
  if (tag.value) v?.addPageOverlay(pageTag); else v?.removePageOverlay('page-tag');
}
async function exp(v: any) {
  const b: Blob = await v.renderPageToImage(undefined, { scale: 1 });
  if (out.value) URL.revokeObjectURL(out.value);
  out.value = URL.createObjectURL(b);
}
</script>

<template>
  <DemoViewer :files="['报告示例.docx', '报告示例.pdf', '产品介绍.pptx']" height="480px">
    <template #toolbar="{ viewer }">
      <button :class="{ on: wm }" @click="toggleWm(viewer)">水印</button>
      <button :class="{ on: tag }" @click="toggleTag(viewer)">页码浮层</button>
      <button @click="exp(viewer)">导出当前页（含浮层）</button>
    </template>
    <template #footer>
      <div v-if="out" class="okp-result"><div class="okp-muted">导出结果：浮层与屏幕显示一致</div><img :src="out" /></div>
    </template>
  </DemoViewer>
</template>
