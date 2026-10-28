# 快速开始

下面就是一个用 Vue 3 组件渲染的预览器（组件安装自 npm）：

<ClientOnly><BasicDemo /></ClientOnly>

> **组件必须有明确的高度**（例如 `height: 100vh` 或父容器的固定高度），否则内容区高度为 0，什么也显示不出来。

## Vue 3

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { OfficeViewer } from 'office-preview-kit/vue';

const src = ref<string | File>('/files/季度报告.docx');
const viewer = ref<InstanceType<typeof OfficeViewer>>();

function onPick(e: Event) {
  const f = (e.target as HTMLInputElement).files?.[0];
  if (f) src.value = f;            // 可以直接传 File
}
</script>

<template>
  <input type="file" @change="onPick" />
  <div style="height: 80vh">
    <OfficeViewer
      ref="viewer"
      :src="src"
      locale="zh-CN"
      @load="(info) => console.log('已加载', info)"
      @error="(err) => console.error(err.code, err.message)"
      @pagechanging="(e) => console.log('第', e.pageNumber, '页')"
    />
  </div>
  <button @click="viewer?.nextPage()">下一页</button>
</template>
```

## React

```tsx
import { useRef, useState } from 'react';
import { OfficeViewer, type OfficeViewerRef } from 'office-preview-kit/react';

export default function Preview() {
  const [src, setSrc] = useState<string | File>('/files/产品介绍.pptx');
  const ref = useRef<OfficeViewerRef>(null);
  return (
    <>
      <input type="file" onChange={(e) => e.target.files?.[0] && setSrc(e.target.files[0])} />
      <OfficeViewer
        ref={ref}
        src={src}
        style={{ height: '80vh' }}
        onLoad={(info) => console.log(info)}
        onPageChanging={(e) => console.log(e.pageNumber)}
      />
      <button onClick={() => ref.current?.nextPage()}>下一页</button>
    </>
  );
}
```

## Web Component（Angular、Svelte、jQuery、纯 HTML 均可用）

```html
<script type="module">
  import 'office-preview-kit/element';

  const el = document.querySelector('office-viewer');
  el.addEventListener('ov-load', (e) => console.log(e.detail));
  el.addEventListener('ov-pagechanging', (e) => console.log(e.detail.pageNumber));

  // 传 File / Blob / ArrayBuffer 时用 property
  // el.source = file;
  // 其他选项
  // el.options = { watermark: '内部资料' };
</script>

<office-viewer src="/files/a.pdf" locale="zh-CN" style="height:600px"></office-viewer>
```

| 属性（attribute） | 说明 |
|---|---|
| `src` | 文件 URL |
| `file-name` | 文件名（作为格式识别的提示，同时用作标题） |
| `locale` | `zh-CN` / `en` |
| `title-text` | 顶栏标题 |
| `toolbar="false"` | 隐藏顶栏 |
| `download="false"` | 隐藏下载按钮 |

元素的 `viewer` 属性就是核心实例，所有[实例方法](/api/methods)都可以通过 `el.viewer.xxx()` 调用。

## 原生 JS（核心类）

```ts
import { OfficeViewer } from 'office-preview-kit';

const viewer = new OfficeViewer(document.getElementById('box')!, { locale: 'zh-CN' });
await viewer.open(file);                 // URL / File / Blob / ArrayBuffer / Uint8Array
viewer.eventBus.on('pagechanging', (e) => console.log(e.pageNumber));
// 用完后释放
viewer.destroy();
```
