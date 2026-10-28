# 属性与选项

## 组件属性（Vue / React）

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `src` | `string \| URL \| File \| Blob \| ArrayBuffer \| Uint8Array` | – | 文件来源；字符串按 URL 处理。变化时自动重新加载 |
| `fileName` | `string` | 自动推断 | 用作标题和格式识别的提示。传 Blob / ArrayBuffer 时建议提供 |
| `locale` | `'zh-CN' \| 'en'` | `'zh-CN'` | 界面语言 |
| `title` | `string` | 文件名 | 顶栏标题 |
| `toolbar` | `boolean` | `true` | 是否显示顶栏 |
| `download` | `boolean` | `true` | 是否显示下载按钮 |
| `fullscreen` | `boolean` | `true` | 是否显示全屏按钮 |
| `options` | `OfficeViewerOptions` | `{}` | 其余全部选项，见下表 |
| `className` / `style` | – | – | 仅 React |

## `OfficeViewerOptions`

| 选项 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `fileName` | `string` | – | 同上 |
| `locale` / `title` / `toolbar` / `download` / `fullscreen` | | | 同上 |
| `accentColor` | `string` | 按文档类型 | 顶栏主题色。默认：文字 `#446995`、表格 `#40865c`、演示 `#aa5252`、PDF `#b4413e` |
| `fetchInit` | `RequestInit` | – | `src` 为 URL 时附加的请求参数（headers、credentials 等），用于鉴权下载 |
| `renderMode` | `'worker' \| 'main'` | `'worker'` | Office 文件的解析和渲染位置 |
| `legacy` | `boolean` | `true` | 是否启用 DOC / XLS / PPT（含 WPS 二进制）直接读取 |
| `useGoogleFonts` | `boolean` | `false` | 是否从 Google Fonts 下载字体。国内网络通常无法访问，默认关闭 |
| `cjkFallback` | `'sc' \| 'tc' \| 'hk' \| 'jp' \| 'kr' \| 'auto'` | `'sc'` | 中日韩字体回退方案 |
| `math` | `MathRenderer` | – | 传入 `@silurus/ooxml/math` 导出的 `math` 后会渲染 OMML 公式（按需加载约 4 MB） |
| `pdfWorkerSrc` | `string` | – | pdf.js Worker 地址；不传时 PDF 在主线程解析 |
| `pdfCMapUrl` | `string` | jsDelivr | CMap 目录，必须以 `/` 结尾 |
| `pdfStandardFontDataUrl` | `string` | jsDelivr | 标准字体目录，必须以 `/` 结尾 |
| `builtinConvert` | `boolean` | `true` | 是否启用内置转换器（DOC / PPT / WPS / XLSB / ODS → OOXML），见[第 14 节](/features/conversion) |
| `converterWasmUrl` | `string` | 自动 | 内置转换器 `.wasm` 文件的地址（自行托管或使用 CDN 时设置） |
| `convert` | `(req) => Promise<{ data, fileName }>` | – | 服务端转换钩子，见[第 14 节](/features/conversion) |
| `watermark` | `string \| WatermarkOptions \| null` | – | 全局水印（屏幕显示 + 导出图片），见[第 12 节](/features/overlays) |
| `onLoad` | `(info: LoadedInfo) => void` | – | 加载完成 |
| `onError` | `(err: ViewerError) => void` | – | 加载或渲染失败 |
| `onPageChange` | `(index: number, total: number) => void` | – | 页码变化（从 0 开始；推荐改用 `pagechanging` 事件） |

修改 `options` 中的 `title`、`locale`、`accentColor`、`watermark`、按钮显隐等**不会**重新加载文档。
