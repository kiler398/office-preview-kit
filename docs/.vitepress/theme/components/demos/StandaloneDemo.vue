<script setup lang="ts">
import { ref } from 'vue';
import { createDocumentRenderer, createWatermark } from 'office-preview-kit/vue';
import { sample, viewerOptions } from '../../shared';

const files = ['报告示例.docx', '产品介绍.pptx', '报告示例.pdf', '销售数据.xlsx', 'WPS文字示例.wps', '销售数据.ods'];
const cards = ref<{ name: string; url?: string; info: string }[]>([]);
const running = ref(false);

async function run() {
  running.value = true;
  cards.value.forEach((c) => c.url && URL.revokeObjectURL(c.url));
  cards.value = files.map((name) => ({ name, info: '渲染中…' }));
  for (const [i, name] of files.entries()) {
    const t0 = performance.now();
    try {
      const r = await createDocumentRenderer(sample(name), { ...viewerOptions, overlays: [createWatermark('缩略图')] });
      const blob = await r.renderPageToImage(1, { width: 220, pixelRatio: 2 });
      cards.value[i] = { name, url: URL.createObjectURL(blob), info: `${r.detect.format}${r.converted ? '（已转换）' : ''} · ${r.pagesCount} ${r.sheetNames ? '个工作表' : '页'} · ${Math.round(performance.now() - t0)} ms` };
      r.destroy();
    } catch (e) {
      cards.value[i] = { name, info: '失败：' + (e as Error).message };
    }
  }
  running.value = false;
}
</script>

<template>
  <div class="okp-demo">
    <div class="okp-demo-toolbar">
      <button :disabled="running" @click="run">为 {{ files.length }} 个文件生成缩略图（不挂载预览器）</button>
    </div>
    <div class="okp-cards">
      <div v-for="c in cards" :key="c.name" class="okp-card">
        <div class="okp-card-img"><img v-if="c.url" :src="c.url" /></div>
        <b>{{ c.name }}</b><span class="okp-muted">{{ c.info }}</span>
      </div>
    </div>
  </div>
</template>
