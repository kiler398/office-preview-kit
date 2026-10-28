// 把 pdf.js 的 cmaps / standard_fonts 复制到 public/pdfjs，文档站离线渲染中文 PDF 不依赖 CDN。
import { cpSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
const require = createRequire(import.meta.url);
const root = dirname(require.resolve('pdfjs-dist/package.json'));
for (const d of ['cmaps', 'standard_fonts']) {
  const to = join('public', 'pdfjs', d);
  if (!existsSync(to)) cpSync(join(root, d), to, { recursive: true });
}
console.log('pdf.js assets copied to public/pdfjs');
