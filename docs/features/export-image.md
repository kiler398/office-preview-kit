# 页面渲染为图片

“当前页 → 图片”调用 `renderPageToImage()`；“全部页 → 缩略图”调用 `renderPagesToImages()`。表格会按单元格区域 `A1:N20` 导出。

<ClientOnly><ExportDemo /></ClientOnly>

渲染在后台离屏完成：**目标页不需要可见**。导出与预览共用同一次文档解析，不会重复解析文件。

![导出图片：DOCX、PPTX、XLSX，含批注、水印和页码浮层](/images/export.jpg)

```ts
// 当前页
const blob = await viewer.renderPageToImage();

// 指定页：宽 1200px，2 倍像素，JPEG
const p3 = await viewer.renderPageToImage(3, { width: 1200, pixelRatio: 2, type: 'image/jpeg', quality: 0.85 });

// 拿到 canvas（例如继续加工或上传）
const canvas = await viewer.renderPageToCanvas(2, { scale: 1.5 });

// 批量，带进度
const list = await viewer.renderPagesToImages('all', { scale: 1 }, (done, total) => console.log(done, '/', total));

// 直接下载
await viewer.downloadPageImage(1, { fileName: '封面.png' });

// 表格：页码表示第几个工作表，range 指定单元格区域
await viewer.renderPageToImage(1, { range: 'A1:H40' });
```

## `PageImageOptions`

| 选项 | 默认值 | 说明 |
|---|---|---|
| `width` | 自然宽度 × `scale` | 输出的 CSS 宽度，高度按页面比例计算 |
| `scale` | `1` | 自然尺寸的倍数（A4 页面在 1 倍时约 794 × 1123） |
| `pixelRatio` | `2` | 每个 CSS 像素对应的位图像素；超过浏览器 canvas 上限时会自动降低 |
| `range` | 已用区域 | 仅对表格有效，例如 `'B2:H40'` |
| `annotations` | `true` | `true`：合成当前批注；`false`：不合成；也可以传入一个批注数组 |
| `overlays` | `true` | 是否合成已注册的页面浮层 |
| `extraOverlays` | – | 只在本次导出时添加的浮层 |
| `watermark` | – | 只在本次导出时添加的水印 |
| `background` | `'#fff'` | 设为 `null` 时背景透明 |
| `type` | `'image/png'` | 也可以是 `'image/jpeg'`、`'image/webp'` |
| `quality` | `0.92` | JPEG / WebP 的压缩质量 |

**合成顺序**：页面底图 → 荧光笔 / 高亮框（正片叠底）→ 其他批注 → 浮层（按 `zIndex` 从小到大）。

**常见用法**

```ts
// 生成缩略图列表（不带批注和浮层）
for (let n = 1; n <= viewer.pagesCount; n++) {
  const b = await viewer.renderPageToImage(n, { width: 120, annotations: false, overlays: false });
  thumbs.push(URL.createObjectURL(b));
}

// 分享当前页：附加一次性水印
const share = await viewer.renderPageToImage(undefined, { watermark: `仅供 ${user.name} 查看` });
```

**参考耗时**（PC 端 Chrome，A4 页面，`scale: 1.5, pixelRatio: 2`）：DOCX 约 1.2 秒/页，PPTX、PDF 约 0.2 秒/页。批量导出建议使用 JPEG 以减少内存占用。
