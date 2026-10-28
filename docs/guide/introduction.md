# 介绍

**office-preview-kit** 是纯前端、只读的 **Office / WPS / PDF 在线预览组件**。同一个核心可在 **Vue 3**、**React**、**Web Component** 和原生 JS 中使用。界面仿照 OnlyOffice 移动端只读模式：工具栏精简，手机和 PC 都能用。

![PC 端预览：缩略图、批注、水印、页码浮层](/images/desktop.jpg)

> 组件源码不公开，通过 npm 发布的成品**可以免费商用**，详见[许可协议](/license)。


| 能力 | 说明 |
|---|---|
| 多格式预览 | DOCX / XLSX / PPTX、DOC / XLS / PPT（实验性）、WPS 文字 / 表格 / 演示、PDF、CSV、TXT / MD、图片 |
| 纯前端渲染 | Office 文件通过 WebAssembly + Canvas 在浏览器中渲染，**不需要部署 Office 服务端** |
| 移动端只读样式 | 仿 OnlyOffice 移动端：按文档类型着色的顶栏、连续滚动、浮动页码、表格底部 Sheet 标签、双指缩放 |
| PC 端适配 | 组件宽度大于 560px 时显示缩放按钮，支持 Ctrl/⌘ + 滚轮缩放、Ctrl/⌘ + F 搜索、全屏 |
| 文档搜索 | 所有格式都可搜索，支持上一个 / 下一个，PDF 中高亮命中位置 |
| pdf.js 兼容 API | `eventBus.on('pagechanging')`、`currentPageNumber`、`currentScale`、`scrollPageIntoView` 等 |
| 批注 / 绘制层 | 画笔、荧光笔、矩形、高亮框、文字、橡皮、自定义工具；可导出 JSON 持久化 |
| 页面渲染为图片 | 当前页、指定页、批量、表格指定区域；合成时可带批注和浮层 |
| 浮层叠加 | 同一个绘制函数，既实时显示在屏幕上，也会合成进导出的图片（水印、页码、印章等） |
| 独立渲染 | 不挂载预览器也能把文件的任意页渲染成图片（文件列表缩略图、批量出图） |
| 内置格式转换器 | Rust 编写、编译为 WebAssembly，在浏览器中把 DOC / PPT / WPS / XLSB / ODS 转成 OOXML 后预览，**不需要服务端** |
| 服务端转换兜底 | 内置转换器也处理不了的格式（ODT / ODP / RTF / OFD 等）自动交给你的转换服务 |
| SSR 安全 | 可在 Nuxt / Next.js 服务端渲染环境中被导入，不会报错 |

![手机尺寸：DOCX 搜索、PDF 搜索高亮、WPS 表格、PPTX、ODT 经转换后预览](/images/mobile.jpg)
