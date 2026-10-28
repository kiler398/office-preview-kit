# 构建工具与部署

## Vite（推荐 Vite 8）

```ts
// 推荐：让 PDF 在 Worker 中解析，避免阻塞主线程
import pdfWorkerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
const options = { pdfWorkerSrc };
```

- **Vite 8**：开发和生产构建都无需额外配置。
- **Vite 7 开发服务器**：需要排除依赖预构建，否则 WASM 资源路径会出错（生产构建不受影响）：

```ts
// vite.config.ts
export default defineConfig({
  optimizeDeps: { exclude: ['@silurus/ooxml', '@silurus/ooxml-legacy-office'] },
});
```

## webpack 5 / Next.js

WASM 通过标准的 `new URL('…', import.meta.url)` 方式引用，webpack 5 和 Next.js（Turbopack）可直接使用。PDF Worker 地址可以这样写：

```ts
const pdfWorkerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();
```

## SSR（Nuxt / Next.js）

包可以在服务端被安全地导入，但**渲染必须在客户端进行**：

```vue
<!-- Nuxt -->
<ClientOnly><OfficeViewer :src="src" /></ClientOnly>
```

```tsx
// Next.js App Router
'use client';
import dynamic from 'next/dynamic';
const OfficeViewer = dynamic(() => import('office-preview-kit/react').then((m) => m.OfficeViewer), { ssr: false });
```

## 内网 / 离线部署

默认情况下，pdf.js 的字符映射（CMap）和标准字体从 jsDelivr CDN 加载，**中文 PDF 依赖 CMap**。内网环境请自行托管：

```bash
# 构建时把文件复制到静态目录
cp -r node_modules/pdfjs-dist/cmaps          public/pdfjs/cmaps
cp -r node_modules/pdfjs-dist/standard_fonts public/pdfjs/standard_fonts
```

```ts
const options = {
  pdfWorkerSrc,
  pdfCMapUrl: '/pdfjs/cmaps/',                       // 必须以 / 结尾
  pdfStandardFontDataUrl: '/pdfjs/standard_fonts/',  // 必须以 / 结尾
  useGoogleFonts: false,                             // 默认就是 false
};
```

其余资源（Office 解析器的 `.wasm`、Worker 脚本）都由构建工具打包进你自己的产物，**运行时不访问任何外部网络**。
