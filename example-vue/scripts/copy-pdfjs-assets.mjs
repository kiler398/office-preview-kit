// Copy pdf.js cmaps + standard fonts into public/ so Chinese PDFs render offline (no CDN).
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
