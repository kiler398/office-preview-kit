import { defineConfig, type Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import { spawn } from 'node:child_process';
import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

/**
 * Demo-only conversion endpoint: POST /api/convert?name=<file>&to=pdf
 * Uses a local LibreOffice (soffice) to convert files the browser can't render
 * (ODF, WPS proprietary binary, RTF, XLSB...). In production put this behind
 * your own Node service / container (LibreOffice, ArtCraft, WPS SDK ...).
 */
function libreOfficeConvert(): Plugin {
  return {
    name: 'demo-libreoffice-convert',
    configureServer(server) {
      server.middlewares.use('/api/convert', (req, res) => {
        const url = new URL(req.url ?? '', 'http://x');
        const name = (url.searchParams.get('name') ?? 'input.bin').replace(/[\\/]/g, '_');
        const to = url.searchParams.get('to') ?? 'pdf';
        const chunks: Buffer[] = [];
        req.on('data', (c) => chunks.push(c));
        req.on('end', () => {
          const dir = mkdtempSync(join(tmpdir(), 'olv-'));
          writeFileSync(join(dir, name), Buffer.concat(chunks));
          const p = spawn('soffice', ['--headless', '--convert-to', to, '--outdir', join(dir, 'out'), join(dir, name)]);
          const timer = setTimeout(() => p.kill('SIGKILL'), 60_000);
          p.on('error', () => { res.statusCode = 501; res.end('soffice not installed'); });
          p.on('close', () => {
            clearTimeout(timer);
            try {
              const out = readdirSync(join(dir, 'out'))[0];
              res.setHeader('Content-Type', 'application/octet-stream');
              res.setHeader('X-File-Name', encodeURIComponent(out));
              res.end(readFileSync(join(dir, 'out', out)));
            } catch {
              if (!res.headersSent) { res.statusCode = 500; res.end('conversion failed'); }
            } finally {
              rmSync(dir, { recursive: true, force: true });
            }
          });
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [vue(), libreOfficeConvert()],
  server: { host: true, port: 5173 },
});
