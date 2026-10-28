# 内置转换器与服务端转换

下面这些文件浏览器无法直接渲染，由内置转换器在浏览器中转换后预览（本站部署在 GitHub Pages 上，没有服务端；ODT 需要服务端转换，所以会提示无法预览）。

<ClientOnly><ConvertDemo /></ClientOnly>

打开文件时按以下顺序处理，**前一步成功就不再继续**：

1. **浏览器直接渲染**：DOCX / XLSX / PPTX / PDF，以及旧版读取器能读取的 DOC / XLS / PPT。
2. **内置转换器**（默认开启）：Rust 编写、编译为 WebAssembly，只有在需要时才加载（约 1 MB gzip）。在浏览器中把文件转换成 OOXML 后再渲染，**不需要任何服务端**：

   | 源格式 | 转换为 | 说明 |
   |---|---|---|
   | `.doc` `.dot`、WPS 文字 `.wps` `.wpt` | DOCX | 保留文字、标题、颜色、列表、表格内容；表格边框等版式可能丢失 |
   | `.ppt` `.pps` `.pot`、WPS 演示 `.dps` `.dpt` | PPTX | 保留幻灯片文字和布局位置；图表、动画会丢失 |
   | `.xls`（直接读取失败时）、WPS 表格 `.et` `.ett`、`.xlsb`、`.ods` | XLSX | 保留数值、文本、日期、公式及其计算结果；单元格样式和合并单元格不保留 |

   转换后，徽标会显示为 `DOC→DOCX` 这样的形式。
3. **`convert` 钩子**：内置转换器不支持（ODT / ODP / RTF / OFD 等）或转换失败时，交给你的服务端。

```ts
// 关闭内置转换器，全部交给服务端（追求最高还原度时）
const options = { builtinConvert: false, convert };

// 自行托管 wasm（例如放到 CDN）
const options = { converterWasmUrl: 'https://cdn.example.com/olv_convert_bg.wasm' };
```

> 内置转换器的 `.wasm` 文件随 npm 包发布（`dist/wasm/`）。Vite、webpack 5 等构建工具会自动把它作为资源文件输出，无需额外配置。

## `convert` 钩子

内置转换器无法处理的文件（ODT、ODP、RTF、OFD、WPS 私有格式等）会交给 `convert` 处理。转换后的文件直接用于预览，**顶栏仍显示原文件名**，徽标显示为 `ODT→PDF` 这样的形式，下载按钮下载的仍是**原文件**。

```ts
const options = {
  async convert({ data, fileName, detect, error }) {
    const res = await fetch(`/api/convert?to=pdf&name=${encodeURIComponent(fileName)}`, {
      method: 'POST',
      body: data,
    });
    if (!res.ok) throw new Error(await res.text());
    return { data: await res.arrayBuffer(), fileName: fileName.replace(/\.\w+$/, '.pdf') };
    // data 也可以是 Blob，或者转换结果的 URL 字符串
  },
};
```

| 入参 | 说明 |
|---|---|
| `data` | 原文件的 `ArrayBuffer` |
| `fileName` | 原文件名 |
| `detect` | 格式识别结果：`format`、`family`、`container`、`isWps`、`reason` |
| `error` | 触发转换的错误（例如旧版读取器抛出的 `unsupported-content`） |

**服务端参考实现**（Node.js + LibreOffice）：

```js
// express
app.post('/api/convert', express.raw({ type: '*/*', limit: '100mb' }), async (req, res) => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'cv-'));
  const input = path.join(dir, path.basename(req.query.name));
  await fs.writeFile(input, req.body);
  const p = spawn('soffice', ['--headless', '--convert-to', req.query.to || 'pdf', '--outdir', dir, input]);
  const timer = setTimeout(() => p.kill('SIGKILL'), 60_000);
  p.on('close', async () => {
    clearTimeout(timer);
    const out = (await fs.readdir(dir)).find((f) => f.endsWith('.' + (req.query.to || 'pdf')));
    out ? res.sendFile(path.join(dir, out)) : res.status(500).end('conversion failed');
  });
});
```

> 生产环境中，转换服务应当运行在隔离容器里，并设置超时、文件大小限制和并发上限。建议**按文件哈希缓存转换结果**。转 PDF 的还原度通常比转 OOXML 更稳定。
