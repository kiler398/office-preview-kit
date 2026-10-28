# 安装与环境要求

组件发布在 npm：[office-preview-kit](https://www.npmjs.com/package/office-preview-kit)。

```bash
npm i office-preview-kit
# 或
pnpm add office-preview-kit
```

- **框架**：`vue >= 3.2` 和 `react >= 17` 都是**可选**的 peerDependency，只在用到对应包装组件时才需要安装。
- **浏览器**：需要支持 ES2020、WebAssembly、Web Worker 和 `createImageBitmap` 的现代浏览器（Chrome / Edge / Firefox 最新版、iOS / macOS Safari 较新版本）。上线前请在目标浏览器上实测。
- **模块格式**：仅提供 ESM。
- **入口**：

| 导入路径 | 内容 |
|---|---|
| `office-preview-kit` | 核心类 `OfficeViewer`、独立渲染函数、工具函数与全部类型 |
| `office-preview-kit/vue` | Vue 3 组件 |
| `office-preview-kit/react` | React 组件 |
| `office-preview-kit/element` | 导入后自动注册 `<office-viewer>` 自定义元素 |

各格式的渲染器**按需动态加载**：打开 PDF 时不会下载 Office 解析器，反之亦然。
