<script setup lang="ts">
import { ref } from 'vue';
import type { AnnotationTool } from 'office-preview-kit/vue';
import DemoViewer from '../DemoViewer.vue';

const tool = ref<AnnotationTool>('none');
const json = ref('[]');
const tools: { id: AnnotationTool; label: string }[] = [
  { id: 'pen', label: '画笔' }, { id: 'highlighter', label: '荧光笔' }, { id: 'rect', label: '矩形' },
  { id: 'highlight', label: '高亮框' }, { id: 'text', label: '文字' }, { id: 'eraser', label: '橡皮' },
];
function setTool(v: any, t: AnnotationTool) {
  tool.value = tool.value === t ? 'none' : t;
  v?.setTool(tool.value, t === 'highlighter' || t === 'highlight' ? { color: '#ffd400' } : { color: '#e5484d' });
}
function stamp(v: any) {
  const n = v?.currentPageNumber ?? 1;
  v?.addAnnotation({ type: 'rect', pageNumber: n, x: 0.66, y: 0.04, width: 0.26, height: 0.07, color: '#d93025', strokeWidth: 4 });
  v?.addAnnotation({ type: 'text', pageNumber: n, x: 0.685, y: 0.055, text: '已审阅 ✓', color: '#d93025', fontSize: 34 });
}
function onEvent(name: string, e: any) {
  if (name === 'annotationschanged') json.value = JSON.stringify(e.annotations.filter((a: any) => a.type !== 'custom'), null, 1);
  if (name === 'documentloaded') tool.value = 'none';
}
</script>

<template>
  <DemoViewer :files="['报告示例.pdf', '报告示例.docx', '产品介绍.pptx']" @viewer-event="onEvent">
    <template #toolbar="{ viewer }">
      <button v-for="t in tools" :key="t.id" :class="{ on: tool === t.id }" @click="setTool(viewer, t.id)">{{ t.label }}</button>
      <span class="okp-sep" />
      <button @click="viewer?.undo()">撤销</button>
      <button @click="stamp(viewer)">盖章（代码添加）</button>
      <button @click="viewer?.clearAnnotations()">清空</button>
    </template>
    <template #footer>
      <details class="okp-json"><summary>export() 结果（可直接存到后端）</summary><pre>{{ json }}</pre></details>
    </template>
  </DemoViewer>
</template>
