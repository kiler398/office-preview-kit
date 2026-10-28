<script setup lang="ts">
import DemoViewer from '../DemoViewer.vue';
</script>

<template>
  <DemoViewer :files="['报告示例.docx', '销售数据.xlsx', '产品介绍.pptx', '报告示例.pdf', 'WPS文字示例.wps', '销售数据.ods']" height="600px" />
</template>
