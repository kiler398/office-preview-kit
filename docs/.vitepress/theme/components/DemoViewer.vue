<script setup lang="ts">
/**
 * 通用演示容器：文件切换 + 预览器。
 * 通过插槽把预览器实例（viewer）和当前文件交给具体演示，用来放工具栏。
 */
import { ref, shallowRef } from 'vue';
import { OfficeViewer, type OfficeViewerOptions } from 'office-preview-kit/vue';
import { sample, viewerOptions } from '../shared';

const props = withDefaults(defineProps<{
  files: string[];
  height?: string;
  options?: OfficeViewerOptions;
  upload?: boolean;
}>(), { height: '560px', options: () => ({}), upload: true });

const emit = defineEmits<{ (e: 'viewer-event', name: string, evt: unknown): void }>();

const current = ref(props.files[0]);
const src = shallowRef<string | File>(sample(props.files[0]));
const viewer = ref<InstanceType<typeof OfficeViewer>>();
const merged = { ...viewerOptions, ...props.options };

function pick(name: string) {
  current.value = name;
  src.value = sample(name);
}
function onUpload(e: Event) {
  const f = (e.target as HTMLInputElement).files?.[0];
  if (!f) return;
  current.value = f.name;
  src.value = f;
  (e.target as HTMLInputElement).value = '';
}
defineExpose({ viewer });
</script>

<template>
  <div class="okp-demo">
    <div class="okp-demo-files">
      <button v-for="f in files" :key="f" :class="{ on: f === current }" @click="pick(f)">{{ f }}</button>
      <label v-if="upload" class="okp-upload">本地文件…<input type="file" @change="onUpload" /></label>
    </div>
    <div v-if="$slots.toolbar" class="okp-demo-toolbar">
      <slot name="toolbar" :viewer="viewer" :file="current" />
    </div>
    <div class="okp-demo-stage" :style="{ height }">
      <OfficeViewer ref="viewer" :src="src" :file-name="current" :options="merged" locale="zh-CN"
        @pagechanging="(e: unknown) => emit('viewer-event', 'pagechanging', e)"
        @pagesloaded="(e: unknown) => emit('viewer-event', 'pagesloaded', e)"
        @scalechanging="(e: unknown) => emit('viewer-event', 'scalechanging', e)"
        @documentloaded="(e: unknown) => emit('viewer-event', 'documentloaded', e)"
        @annotationschanged="(e: unknown) => emit('viewer-event', 'annotationschanged', e)"
        @annotationclick="(e: unknown) => emit('viewer-event', 'annotationclick', e)"
        @error="(e: unknown) => emit('viewer-event', 'error', e)" />
    </div>
    <slot name="footer" :viewer="viewer" :file="current" />
  </div>
</template>
