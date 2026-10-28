# 批注与绘制层

选择一个工具，在页面上画；点击“盖章”演示用代码添加批注，展开下方面板可以看到 `export()` 导出的 JSON。

<ClientOnly><AnnotationDemo /></ClientOnly>

DOCX、PPTX、PDF 和图片的每一页上方都有一个 SVG 绘制层。

![绘制层：画笔、荧光笔、矩形、高亮框、文字批注、盖章](/images/annotations.jpg)

## 坐标系

批注**按页面归一化存储**：`x`、`y`、`width`、`height` 都是相对于页面宽高的 0..1 比例；线宽 `strokeWidth` 和字号 `fontSize` 以**页面宽度的千分之一**为单位。因此：

- 缩放、窗口尺寸变化后批注始终贴合内容，不需要重新计算；
- 页面因虚拟滚动被回收、之后重新挂载时，批注会自动重绘；
- 同一份批注 JSON 在 PC 端和手机上的显示位置完全一致。

## 内置工具

```ts
viewer.annotations.setTool('pen', { color: '#e5484d', strokeWidth: 3 });
viewer.annotations.setTool('none');   // 回到阅读模式（可以滚动、选中文字）
```

| 工具 | 效果 | 默认样式 |
|---|---|---|
| `none` | 阅读模式；点击批注会触发 `annotationclick` | – |
| `pen` | 自由画笔 → `ink` | 红色，线宽 3 |
| `highlighter` | 半透明荧光笔 → `ink` | 黄色，线宽 18，不透明度 0.4 |
| `rect` | 拖拽画矩形框 → `rect` | 红色，线宽 3 |
| `highlight` | 拖拽画高亮区域 → `highlight`（正片叠底，不遮挡文字） | 黄色，不透明度 0.38 |
| `text` | 点击位置输入文字（Enter 确认，Shift+Enter 换行，Esc 取消）→ `text` | 红色，字号 18 |
| `eraser` | 点击批注将其删除 | – |
| `custom` | 只捕获指针，不做任何绘制，派发 `layerpointer*` 事件 | – |

> 绘制工具激活时，绘制层会接管鼠标和触摸操作，此时**手机上无法用手指滚动文档**。绘制完成后请切回 `none`。

## 批注类型（用代码添加）

```ts
const A = viewer.annotations;
A.add({ type: 'rect',      pageNumber: 1, x: 0.1, y: 0.2, width: 0.3, height: 0.1, color: '#d93025', strokeWidth: 4 });
A.add({ type: 'highlight', pageNumber: 2, x: 0.1, y: 0.5, width: 0.8, height: 0.04, color: '#ffd400' });
A.add({ type: 'ink',       pageNumber: 1, points: [[0.1, 0.1], [0.2, 0.15], [0.3, 0.12]], strokeWidth: 3 });
A.add({ type: 'text',      pageNumber: 1, x: 0.6, y: 0.05, text: '已审阅 ✓', fontSize: 30,
        data: { author: '张三', createdAt: Date.now() } });       // data 用于存放业务字段，会随 export() 一起导出
A.add({ type: 'custom',    pageNumber: 1, render: ({ svg, toSvg }) => {
  const [x, y] = toSvg(0.5, 0.5);
  const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  c.setAttribute('cx', String(x)); c.setAttribute('cy', String(y)); c.setAttribute('r', '20');
  svg.appendChild(c);
}});
```

| 类型 | 字段 |
|---|---|
| 公共字段 | `id?`、`pageNumber`、`color?`、`opacity?`、`data?` |
| `rect` | `x, y, width, height, strokeWidth?, fill?` |
| `highlight` | `x, y, width, height` |
| `ink` | `points: [x, y][], strokeWidth?` |
| `text` | `x, y, text, fontSize?` |
| `custom` | `render(ctx, annotation)`：页面每次挂载时都会调用；`ctx` 中包含 `svg`、`layer`、`div`、`width`、`height`、`toSvg(x, y)` |

## 持久化到后端

```ts
// 有变化就保存
viewer.eventBus.on('annotationschanged', debounce(() => {
  api.saveAnnotations(docId, viewer.annotations.export());
}, 800));

// 打开文档后恢复
viewer.eventBus.on('documentloaded', async () => {
  viewer.annotations.import(await api.loadAnnotations(docId), { replace: true });
});
```

> 打开新文档时，旧文档的批注会被清空。

## 自定义工具示例：点击盖章

```ts
viewer.annotations.setTool('custom');
viewer.eventBus.on('layerpointerdown', ({ point }) => {
  viewer.annotations.add({ type: 'rect', pageNumber: point.pageNumber,
    x: point.x - 0.1, y: point.y - 0.03, width: 0.2, height: 0.06, color: '#d93025' });
  viewer.annotations.add({ type: 'text', pageNumber: point.pageNumber,
    x: point.x - 0.085, y: point.y - 0.018, text: '已审核', color: '#d93025', fontSize: 28 });
});
```

## 直接操作绘制层

需要绘制任意内容时，可以监听 `pagelayerready`：

```ts
viewer.eventBus.on('pagelayerready', ({ pageNumber, svg, width, height }) => { /* 向 svg 中添加元素 */ });
```

页面滚出可视区后 DOM 会被回收，直接画在绘制层里的内容也会随之消失。需要持久保留的图形，请使用 `custom` 类型的批注（每次挂载时自动重绘），或者在每次 `pagelayerready` 时重新绘制。
