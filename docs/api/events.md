# 事件

所有事件都通过 **`viewer.eventBus`** 派发。事件名和参数尽量与 pdf.js 的 `EventBus` 保持一致，**页码从 1 开始**。

| 事件 | 参数（除 `source` 外） | 触发时机 |
|---|---|---|
| `documentloaded` | `fileName, detect, converted` | 文档加载完成 |
| `documentclosed` | – | 打开新文档前，旧文档被关闭 |
| `pagesinit` | – | 页面初始化完成 |
| `pagesloaded` | `pagesCount` | 页数确定 |
| `pagechanging` | `pageNumber, previous, pagesCount` | 当前页变化（表格中对应工作表切换） |
| `pagerendered` | `pageNumber, div, kind` | PDF：页面画布绘制完成；DOCX / PPTX / 图片：页面挂载到 DOM |
| `pagelayerready` | `pageNumber, div, layer, svg, width, height` | 某页的绘制层创建或重建 |
| `scalechanging` | `scale` | 缩放比例变化 |
| `sheetchanging` | `sheetIndex, sheetName` | 工作表切换 |
| `updatefindmatchescount` | `matchesCount: { current, total }` | 搜索结果数量或当前位置变化 |
| `annotationadded` / `annotationupdated` / `annotationremoved` | `annotation` | 单条批注变化 |
| `annotationschanged` | `annotations` | 批注列表发生任何变化（适合持久化） |
| `annotationclick` | `annotation, originalEvent` | 阅读模式下点击了某条批注 |
| `toolchanged` | `tool` | 绘制工具切换 |
| `layerpointerdown` / `layerpointermove` / `layerpointerup` | `point: { pageNumber, x, y }, originalEvent` | 绘制工具激活时的指针事件（x、y 为页内 0..1 坐标） |
| `error` | `error` | 出错 |

## 订阅方式

```ts
// 核心实例 / Web Component 的 el.viewer / Vue 和 React 的 ref
const off = viewer.eventBus.on('pagechanging', ({ pageNumber, previous }) => {});
viewer.eventBus.on('documentloaded', fn, { once: true });   // 只触发一次
viewer.eventBus.off('pagechanging', fn);
off();                                                       // on() 返回取消订阅函数
```

| 框架 | 写法 |
|---|---|
| Vue | 每个事件都以**同名事件**抛出：`@pagechanging`、`@scalechanging`、`@annotationschanged`……另外还有 `@load`、`@error`、`@pageChange` |
| React | `onViewerEvent(name, evt)` 接收全部事件；另有快捷回调 `onPageChanging`、`onPageRendered`、`onPageLayerReady`、`onScaleChanging`、`onAnnotationsChange(list)`、`onAnnotationClick` |
| Web Component | DOM 事件 `ov-<事件名>`，例如 `ov-pagechanging`，参数在 `event.detail` 中；另有 `ov-load`、`ov-error`、`ov-pagechange` |
