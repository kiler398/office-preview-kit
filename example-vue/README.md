# office-preview-kit · Vue 3 示例

演示 [office-preview-kit](../README.md) 的主要能力：多格式预览、仿 pdf.js 的翻页事件、批注与绘制层、页面渲染为图片、水印和页码浮层、缩略图，以及服务端转换兜底。

## 运行

```bash
npm install      # 安装时会把 pdf.js 的 cmaps / standard_fonts 复制到 public/pdfjs（离线渲染中文 PDF）
npm run dev      # http://localhost:5173
```

- `public/samples/` 里是测试文件，涵盖 DOCX / XLSX / PPTX / PDF / DOC / XLS / PPT / WPS / ODT / CSV / MD 等格式。
- 开发服务器提供一个**仅用于演示**的 `/api/convert` 转换接口，依赖本机安装的 LibreOffice（`soffice`）。没有安装时，ODT、部分 DOC / PPT / WPS 文件会显示“无法预览”，其他格式不受影响。
- 页面左侧可以打开本地文件；勾选“手机尺寸预览”可以查看移动端样式。

## 主要代码

全部用法都在 `src/App.vue`：

| 功能 | 用到的 API |
|---|---|
| 翻页条 | `@pagesloaded`、`@pagechanging`、`currentPageNumber`、`nextPage()` / `previousPage()` |
| 绘制工具栏 | `setTool()`、`addAnnotation()`、`undo()`、`clearAnnotations()`、`exportAnnotations()` |
| 当前页→图片 / 全部页→JPG | `renderPageToImage()`、`renderPagesToImages()` |
| 缩略图 | `renderPageToImage(n, { width: 120 })` |
| 水印 / 页码浮层 | `setWatermark()`、`addPageOverlay()` |
| 服务端转换 | `options.convert` + `vite.config.ts` 中的 `/api/convert` 中间件 |
