# 页面浮层与水印

打开水印和页码浮层，再点击“导出当前页”：同一个 `draw` 函数既画在屏幕上，也合成进导出的图片。

<ClientOnly><OverlayDemo /></ClientOnly>

浮层（`PageOverlay`）是一个 **canvas 绘制函数**。同一个函数既实时显示在每一页上方，也会在导出图片时合成进去，两边位置一致。适合用来做水印、页码、印章、OCR 识别框、热力图等。

```ts
const id = viewer.addPageOverlay({
  id: 'page-tag',               // 可选，同一个 id 会被替换
  zIndex: 10,                   // 越大越靠上（水印默认 100）
  pages: (n) => n > 1,          // 可选：只作用于部分页，也可以传页码数组
  screen: true,                 // 是否在屏幕上显示
  export: true,                 // 是否合成进导出图片
  draw(ctx, { pageNumber, pagesCount, width, height, mode, fileName }) {
    // width / height 为 CSS 像素，按比例计算坐标，屏幕和导出就会一致
    const h = width * 0.03;
    ctx.fillStyle = 'rgba(68,105,149,.9)';
    ctx.fillRect(width * 0.8, 0, width * 0.2, h);
    ctx.fillStyle = '#fff';
    ctx.font = `${h * 0.55}px sans-serif`;
    ctx.fillText(`${pageNumber} / ${pagesCount}`, width * 0.85, h * 0.7);
    // mode 为 'screen' 或 'export'，可以据此区分两种场景
  },
});
viewer.removePageOverlay(id);
```

`draw` 可以是异步函数，例如先加载印章图片再绘制。

## 水印

```ts
viewer.setWatermark('内部资料');                       // 最简写法
viewer.setWatermark({
  text: ['张三 内部资料', '2026-10-28'],                // 支持多行
  color: 'rgba(200,30,30,.10)',
  fontSize: 20,                                       // 以 800px 页宽为基准，随页面等比缩放
  angle: -30,
  gapX: 220, gapY: 150,
  export: true, screen: true,
});
viewer.setWatermark(null);                            // 移除

// 也可以在初始化时设置
<OfficeViewer :options="{ watermark: '内部资料' }" />
```

> 前端水印只能起到提示和威慑作用，无法防止截图或对原文件的提取。有防泄露要求时，请配合服务端鉴权和服务端出图。
