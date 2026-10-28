# 翻页与缩放（pdf.js 兼容）

下面的演示完全基于公开 API：工具栏调用 `previousPage()` / `nextPage()` / `currentPageNumber` / `currentScale`，下方日志显示 `eventBus` 派发的事件。

<ClientOnly><NavigationDemo /></ClientOnly>

```ts
viewer.eventBus.on('pagesloaded', ({ pagesCount }) => renderPager(pagesCount));
viewer.eventBus.on('pagechanging', ({ pageNumber }) => (pager.value = pageNumber));
viewer.eventBus.on('scalechanging', ({ scale }) => (zoom.value = Math.round(scale * 100)));

viewer.currentPageNumber = 5;                       // 跳到第 5 页
viewer.scrollPageIntoView({ pageNumber: 2, top: 0.5 });  // 第 2 页的中部
viewer.currentScale = 1.5;                          // 150%
viewer.currentScaleValue = 'page-width';            // 适应宽度
```

**与 pdf.js 的差异：**

- `pagerendered` 事件：DOCX / PPTX 在页面**挂载到 DOM 时**触发，并不代表画布已经绘制完成（底层渲染器不对外提供绘制完成的通知）。PDF 与 pdf.js 一致。
- `currentScale` 的含义取决于具体渲染器（1 = 该渲染器的 100%），不同格式之间的数值不可直接比较。
- 表格（XLSX / CSV）中的“页”指工作表：`currentPageNumber = 2` 表示切换到第 2 个工作表，同时触发 `sheetchanging` 和 `pagechanging`。
- 文档末尾几页高度不足一屏时，跳到最后一页后，`pagechanging` 报告的可能是倒数第二页（当前页按视口上方 1/3 处所在的页面计算）。
