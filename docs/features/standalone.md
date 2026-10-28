# 独立渲染（不挂载预览器）

点击按钮，用 `createDocumentRenderer()` 在**不挂载预览器**的情况下为多个文件生成首页缩略图（带水印浮层）。

<ClientOnly><StandaloneDemo /></ClientOnly>

适用于文件列表缩略图、在浏览器中批量出图、“把第 N 页分享为图片”等场景。

```ts
import { createDocumentRenderer, renderDocumentPage, createWatermark } from 'office-preview-kit';

const r = await createDocumentRenderer(file, {
  pdfWorkerSrc,
  annotations: savedJson,                          // 可选：合成批注
  overlays: [createWatermark('内部资料')],          // 可选：合成浮层
  convert,                                         // 可选：浏览器无法渲染时转换
});
console.log(r.detect.format, r.pagesCount, r.sheetNames);
const cover = await r.renderPageToImage(1, { width: 240 });
const sheet = await r.renderPageToImage(1, { range: 'A1:E20' });   // 表格
r.destroy();                                                        // 用完释放

// 一次性渲染单页
const blob = await renderDocumentPage('/files/产品介绍.pptx', 3, { width: 960 });
```

`createDocumentRenderer(src, options)` 支持的选项：`fileName`、`fetchInit`、`renderMode`、`legacy`、`useGoogleFonts`、`cjkFallback`、`math`、`pdfWorkerSrc`、`pdfCMapUrl`、`pdfStandardFontDataUrl`、`builtinConvert`、`converterWasmUrl`、`convert`、`annotations`、`overlays`。

返回的对象包含：`fileName`、`detect`、`pagesCount`、`sheetNames`、`converted`、`pageSize(n, range?)`、`renderPageToCanvas(n, opts)`、`renderPageToImage(n, opts)`、`destroy()`。
