# TypeScript 类型

包内附带完整的类型声明。常用类型：

```ts
import type {
  OfficeViewerOptions, ViewerSource, LoadedInfo, ViewerError, ConvertRequest, ConvertResult,
  ViewerEventMap, ViewerEventName, PagePoint,
  Annotation, AnnotationInput, AnnotationTool, ToolStyle, LayerContext,
  PageOverlay, OverlayInfo, PageImageOptions, WatermarkOptions,
  DocumentRenderer, StandaloneOptions, DetectResult,
} from 'office-preview-kit';
```

`ViewerError.code` 的取值：

| code | 含义 |
|---|---|
| `fetch-failed` | 下载文件失败（网络错误或 HTTP 状态码非 2xx） |
| `unsupported` | 不支持的格式 |
| `needs-conversion` | 需要配置 `convert`，或转换失败 |
| `encrypted` | 文件已加密 |
| `render-failed` | 解析或渲染失败 |
