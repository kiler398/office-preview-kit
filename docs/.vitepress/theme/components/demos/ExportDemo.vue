<script setup lang="ts">
import { ref } from 'vue';
import DemoViewer from '../DemoViewer.vue';

const img = ref<{ url: string; info: string } | null>(null);
const thumbs = ref<string[]>([]);
const busy = ref('');

async function current(v: any, file: string) {
  busy.value = '渲染中…';
  try {
    const t0 = performance.now();
    const isSheet = /\.(xlsx|xls|et|ods|csv)$/i.test(file);
    const blob: Blob = await v.renderPageToImage(undefined, isSheet ? { range: 'A1:N20' } : { scale: 1.5 });
    if (img.value) URL.revokeObjectURL(img.value.url);
    img.value = { url: URL.createObjectURL(blob), info: `${(blob.size / 1024).toFixed(0)} KB · ${Math.round(performance.now() - t0)} ms` };
  } catch (e) { busy.value = '失败：' + (e as Error).message; return; }
  busy.value = '';
}
async function all(v: any) {
  thumbs.value.forEach(URL.revokeObjectURL);
  thumbs.value = [];
  const list = await v.renderPagesToImages('all', { width: 140, annotations: false }, (d: number, t: number) => (busy.value = `${d}/${t}`));
  thumbs.value = list.map((x: { blob: Blob }) => URL.createObjectURL(x.blob));
  busy.value = '';
}
</script>

<template>
  <DemoViewer :files="['产品介绍.pptx', '报告示例.docx', '报告示例.pdf', '销售数据.xlsx']" height="480px">
    <template #toolbar="{ viewer, file }">
      <button @click="current(viewer, file)">当前页 → 图片</button>
      <button @click="all(viewer)">全部页 → 缩略图</button>
      <button @click="viewer?.downloadPageImage()">下载当前页 PNG</button>
      <span class="okp-muted">{{ busy }}</span>
    </template>
    <template #footer>
      <div v-if="thumbs.length" class="okp-thumbs"><img v-for="(t, i) in thumbs" :key="i" :src="t" /></div>
      <div v-if="img" class="okp-result"><div class="okp-muted">导出结果 · {{ img.info }}</div><img :src="img.url" /></div>
    </template>
  </DemoViewer>
</template>
