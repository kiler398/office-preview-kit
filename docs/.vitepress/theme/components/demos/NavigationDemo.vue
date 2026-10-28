<script setup lang="ts">
import { ref } from 'vue';
import DemoViewer from '../DemoViewer.vue';

const page = ref(0);
const pages = ref(0);
const scale = ref(1);
const input = ref('1');
const log = ref<string[]>([]);

function onEvent(name: string, e: any) {
  if (name === 'pagesloaded') pages.value = e.pagesCount;
  if (name === 'pagechanging') { page.value = e.pageNumber; input.value = String(e.pageNumber); }
  if (name === 'scalechanging') scale.value = e.scale;
  if (name === 'documentloaded') log.value = [];
  const brief = name === 'pagechanging' ? `${e.previous} → ${e.pageNumber}` : name === 'pagesloaded' ? `pagesCount=${e.pagesCount}`
    : name === 'scalechanging' ? `scale=${e.scale.toFixed(2)}` : name === 'documentloaded' ? e.fileName : '';
  log.value.unshift(`${name}  ${brief}`);
  log.value.length = Math.min(log.value.length, 8);
}
</script>

<template>
  <DemoViewer :files="['报告示例.pdf', '报告示例.docx', '产品介绍.pptx']" @viewer-event="onEvent">
    <template #toolbar="{ viewer }">
      <button :disabled="page <= 1" @click="viewer?.previousPage()">‹ 上一页</button>
      <input v-model="input" class="okp-num" @keydown.enter="viewer && (viewer.currentPageNumber = Number(input))" />
      <span class="okp-muted">/ {{ pages }}</span>
      <button :disabled="page >= pages" @click="viewer?.nextPage()">下一页 ›</button>
      <span class="okp-sep" />
      <button @click="viewer && (viewer.currentScale = (viewer.currentScale ?? 1) * 0.8)">−</button>
      <span class="okp-muted">{{ Math.round(scale * 100) }}%</span>
      <button @click="viewer && (viewer.currentScale = (viewer.currentScale ?? 1) * 1.25)">+</button>
      <button @click="viewer?.fitWidth()">适应宽度</button>
    </template>
    <template #footer>
      <pre class="okp-log">{{ log.join('\n') || '翻页、缩放时这里会显示 eventBus 事件' }}</pre>
    </template>
  </DemoViewer>
</template>
