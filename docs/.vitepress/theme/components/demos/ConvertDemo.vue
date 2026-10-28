<script setup lang="ts">
import { ref } from 'vue';
import DemoViewer from '../DemoViewer.vue';

const badge = ref('');
function onEvent(name: string, e: any) {
  if (name === 'documentloaded') badge.value = `${e.fileName} → ${e.detect.format.toUpperCase()}${e.converted ? '（浏览器内转换）' : '（直接渲染）'}`;
  if (name === 'error') badge.value = '无法预览：' + (e?.message ?? e);
}
</script>

<template>
  <DemoViewer :files="['报告示例.doc', 'WPS文字示例.wps', '产品介绍.ppt', 'WPS演示示例.dps', '销售数据.ods', '销售数据.xls', '报告示例.odt']" height="520px" @viewer-event="onEvent">
    <template #toolbar>
      <span class="okp-muted">{{ badge || '选择一个文件' }}</span>
    </template>
  </DemoViewer>
</template>
