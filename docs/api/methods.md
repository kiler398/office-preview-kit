# 实例方法

获取实例：Vue 用 `ref`（模板 ref），React 用 `ref.current`，Web Component 用 `el.viewer`，原生 JS 直接使用 `new OfficeViewer(...)` 的返回值。

## 文档

| 方法 / 属性 | 说明 |
|---|---|
| `open(src, fileName?)` | 打开文件，返回 `Promise<LoadedInfo \| null>` |
| `setOptions(patch)` | 修改选项，不重新加载文档 |
| `download()` | 下载原文件（经过转换的文件也下载原件） |
| `toggleFullscreen()` | 进入或退出全屏（不支持 Fullscreen API 的环境自动降级为铺满窗口） |
| `info` | 当前文档信息 `LoadedInfo` |
| `destroy()` | 销毁实例（仅原生 JS 需要手动调用，框架组件会自动处理） |

## 翻页与缩放

| 方法 / 属性 | 说明 |
|---|---|
| `pagesCount` | 页数 / 幻灯片数 / 工作表数 |
| `currentPageNumber` | 当前页（从 1 开始）；**赋值即跳页** |
| `nextPage()` / `previousPage()` | 下一页 / 上一页，到头时返回 `false` |
| `scrollPageIntoView({ pageNumber, top?, behavior? })` | 滚动到指定页；`top` 为页内偏移（0..1） |
| `goTo(index)` / `goToSheet(index)` | 按 0 开始的索引跳转（平滑滚动）/ 切换工作表 |
| `currentScale` | 缩放比例；赋值即缩放 |
| `currentScaleValue = 'page-width'` | 适应宽度（也可以赋数字） |
| `zoomIn()` / `zoomOut()` / `fitWidth()` | 放大 / 缩小 / 适应宽度 |

## 搜索

| 方法 | 说明 |
|---|---|
| `search(keyword)` | 打开搜索栏并搜索，返回命中数量；结果通过 `updatefindmatchescount` 事件同步 |

## 批注（`viewer.annotations`，Vue / React 的 ref 上另有同名快捷方法）

| 方法 | 快捷方法 | 说明 |
|---|---|---|
| `setTool(tool, style?)` | `setTool` | 切换绘制工具，见[第 10 节](/features/annotations) |
| `add(annotation)` | `addAnnotation` | 添加批注，返回带 `id` 的批注对象 |
| `update(id, patch)` | – | 修改批注 |
| `remove(id)` | `removeAnnotation` | 删除批注 |
| `clear(pageNumber?)` | `clearAnnotations` | 清空全部或某一页的批注 |
| `undo()` | `undo` | 撤销最近一次用工具绘制的批注 |
| `list(pageNumber?)` / `get(id)` | – | 查询批注 |
| `export()` | `exportAnnotations` | 导出可序列化的 JSON（`custom` 类型除外） |
| `import(list, { replace? })` | `importAnnotations` | 导入批注 |
| `getPageLayer(n)` | `getPageLayer` | 获取某页当前的绘制层（页面未挂载时返回 `null`） |
| `clientToPage(x, y)` | `clientToPage` | 把屏幕坐标转换成 `{ pageNumber, x, y }` |

## 渲染为图片与浮层

| 方法 | 说明 |
|---|---|
| `renderPageToImage(n?, opts?)` | 把第 `n` 页（默认当前页）渲染为 `Blob` |
| `renderPageToCanvas(n?, opts?)` | 渲染并返回合成好的 `HTMLCanvasElement` |
| `renderPagesToImages(pages?, opts?, onProgress?)` | 批量渲染，`pages` 可以是 `'all'` 或页码数组 |
| `downloadPageImage(n?, opts?)` | 渲染后直接下载 |
| `addPageOverlay(overlay)` / `removePageOverlay(id)` / `clearPageOverlays()` | 注册 / 移除页面浮层 |
| `setWatermark(opts \| null)` | 设置、替换或移除水印 |
