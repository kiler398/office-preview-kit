<h1 align="center">office-preview-kit</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/office-preview-kit"><img src="https://img.shields.io/npm/v/office-preview-kit.svg" alt="npm version"></a>
  <a href="https://kiler398.github.io/office-preview-kit/"><img src="https://img.shields.io/badge/docs-%E6%96%87%E6%A1%A3-446995.svg" alt="docs"></a>
  <img src="https://img.shields.io/badge/license-freeware%20%C2%B7%20commercial%20use%20free-40865c.svg" alt="license">
</p>

<p align="center">
  <b>中文</b> · <a href="#english">English</a>
</p>

![office-preview-kit](https://raw.githubusercontent.com/kiler398/office-preview-kit/main/docs/public/images/desktop.jpg)

## 简介

**office-preview-kit** 是纯前端、只读的 **Office / WPS / PDF 在线预览组件**，支持 **Vue 3**、**React**、**Web Component** 和原生 JS。界面仿照 OnlyOffice 移动端只读模式，工具栏精简，手机和 PC 都能用。

- 📖 **文档与在线演示**：<https://kiler398.github.io/office-preview-kit/>
- 📦 **npm**：<https://www.npmjs.com/package/office-preview-kit>

### 特性

- **多格式**：DOCX / XLSX / PPTX、DOC / XLS / PPT、WPS 文字 / 表格 / 演示（`.wps` `.et` `.dps`）、PDF、ODS、XLSB、CSV、TXT、图片。按文件内容识别格式，不看扩展名
- **纯前端**：Office 文件通过 WebAssembly + Canvas 在浏览器中渲染，不需要 Office 服务端；旧格式和 WPS 由内置的 Rust/WASM 转换器在浏览器中转换
- **移动端只读样式**：按文档类型着色的顶栏、连续滚动、浮动页码、表格底部 Sheet 标签、双指缩放
- **pdf.js 兼容 API**：`eventBus.on('pagechanging')`、`currentPageNumber`、`currentScale`、`scrollPageIntoView`……
- **批注与绘制层**：画笔、荧光笔、矩形、高亮框、文字、橡皮、自定义工具，可导出 JSON
- **页面渲染为图片**：当前页、指定页、批量导出，支持合成批注、水印、页码等浮层
- **独立渲染**：不挂载预览器，也能把任意文件的任意页渲染成图片（缩略图、批量出图）

### 安装

```bash
npm i office-preview-kit
```

### 快速开始

```vue
<!-- Vue 3 -->
<script setup>
import { OfficeViewer } from 'office-preview-kit/vue';
</script>

<template>
  <div style="height: 80vh">
    <OfficeViewer src="/files/报告.docx" @pagechanging="(e) => console.log(e.pageNumber)" />
  </div>
</template>
```

```tsx
// React
import { OfficeViewer } from 'office-preview-kit/react';

<OfficeViewer src={file} style={{ height: '80vh' }} />;
```

```html
<!-- Web Component -->
<script type="module">import 'office-preview-kit/element';</script>
<office-viewer src="/files/a.pdf" style="height:600px"></office-viewer>
```

更多用法（构建配置、事件、方法、批注、导出图片、水印、服务端转换等）请看 **[文档站](https://kiler398.github.io/office-preview-kit/)**。

### 许可

**本组件不开源**：源码不公开，本仓库只包含文档与演示。
通过 npm 发布的成品**可以免费用于个人和商业项目**，包括集成到你的网站、应用、SaaS 中一起分发和销售，无需付费。
不允许反向工程，也不允许把组件单独再发布或出售。完整条款见 [LICENSE](LICENSE)，第三方开源组件见 npm 包中的 `THIRD_PARTY_NOTICES.md`。

问题反馈：[GitHub Issues](https://github.com/kiler398/office-preview-kit/issues)

---

<a id="english"></a>

## English

**office-preview-kit** is a client-side, read-only **online previewer for Office, WPS and PDF files**, usable from **Vue 3**, **React**, as a **Web Component** or from plain JS. The UI follows the mobile read-only mode of OnlyOffice: a minimal toolbar that works well on both phones and desktops.

- 📖 **Docs & live demo** (Chinese): <https://kiler398.github.io/office-preview-kit/>
- 📦 **npm**: <https://www.npmjs.com/package/office-preview-kit>

### Features

- **Many formats**: DOCX / XLSX / PPTX, DOC / XLS / PPT, WPS Writer / Spreadsheets / Presentation (`.wps` `.et` `.dps`), PDF, ODS, XLSB, CSV, TXT and images. Formats are detected by file content, not by extension
- **No server required**: Office files are rendered in the browser with WebAssembly + Canvas; legacy and WPS files are converted in the browser by a built-in Rust/WASM converter
- **Mobile-style read-only UI**: colored header per document type, continuous scrolling, floating page indicator, sheet tabs, pinch-to-zoom
- **pdf.js-compatible API**: `eventBus.on('pagechanging')`, `currentPageNumber`, `currentScale`, `scrollPageIntoView`, …
- **Annotation layer**: pen, highlighter, rectangle, highlight box, text, eraser and custom tools, exportable as JSON
- **Render pages to images**: current page, any page or all pages, with annotations, watermarks and other overlays composited
- **Headless rendering**: render any page of any file to an image without mounting a viewer (thumbnails, batch export)

### Install

```bash
npm i office-preview-kit
```

### Quick start

```vue
<!-- Vue 3 -->
<script setup>
import { OfficeViewer } from 'office-preview-kit/vue';
</script>

<template>
  <div style="height: 80vh">
    <OfficeViewer src="/files/report.docx" @pagechanging="(e) => console.log(e.pageNumber)" />
  </div>
</template>
```

```tsx
// React
import { OfficeViewer } from 'office-preview-kit/react';

<OfficeViewer src={file} style={{ height: '80vh' }} />;
```

```html
<!-- Web Component -->
<script type="module">import 'office-preview-kit/element';</script>
<office-viewer src="/files/a.pdf" style="height:600px"></office-viewer>
```

See the **[documentation site](https://kiler398.github.io/office-preview-kit/)** for bundler setup, events, methods, annotations, image export, watermarks, server-side conversion and more.

### License

**This component is not open source**: the source code is not public, and this repository contains only documentation and demos.
The build published on npm is **free to use in personal and commercial projects**, including integrating it into your websites, applications and SaaS products and distributing or selling them, at no cost.
Reverse engineering is not permitted, and neither is redistributing or selling the component on its own. See [LICENSE](LICENSE) for the full terms and `THIRD_PARTY_NOTICES.md` in the npm package for third-party open-source components.

Feedback: [GitHub Issues](https://github.com/kiler398/office-preview-kit/issues)
