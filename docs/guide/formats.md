# 格式支持

| 格式 | 浏览器直接渲染 | 说明 |
|---|:---:|---|
| `.docx` `.docm` `.dotx` | ✅ | 分页排版，支持页眉页脚、表格、图片、编号、脚注、中文排版 |
| `.xlsx` `.xlsm` `.xltx` | ✅ | 多工作表、冻结窗格、条件格式、图表；**公式只显示文件中缓存的结果** |
| `.pptx` `.pptm` `.ppsx` `.potx` | ✅ | 母版、布局、图表、备注；**不播放动画和切换效果** |
| `.pdf` | ✅ | 基于 pdf.js，懒加载渲染 |
| `.csv` `.tsv` | ✅ | 自动识别 UTF-8 / GB18030 编码；所有字段按文本显示 |
| `.xls`、WPS 表格 `.et` `.ett` | ✅ 实验性 | 旧版二进制读取器（BIFF8 子集） |
| `.doc` `.ppt`、WPS 文字 `.wps` `.wpt`、WPS 演示 `.dps` `.dpt` | ✅ | 先尝试直接读取；读取器不支持时，由**内置转换器**在浏览器中转成 DOCX / PPTX |
| `.xlsb` `.ods` | ✅ | 内置转换器在浏览器中转成 XLSX |
| `.odt` `.odp`、`.rtf`、`.ofd` | ➡️ | 需要配置 [`convert`](/features/conversion) |
| `.txt` `.md` `.json` `.xml` `.log` 等 | ✅ | 纯文本显示，支持搜索 |
| `.png` `.jpg` `.gif` `.webp` `.bmp` `.svg` | ✅ | 图片显示，支持缩放和批注 |

**格式识别依据文件内容，而不是扩展名。** 组件会读取 ZIP 目录和 OLE2 复合文档的流名，判断文件的真实格式：

- 以 OOXML 格式保存的 `.wps` 按 DOCX 渲染；
- 含有 `WordDocument` / `Workbook` / `PowerPoint Document` 流的 WPS 二进制文件，按 DOC / XLS / PPT 渲染；
- 浏览器渲染器无法直接打开的 DOC / PPT / WPS / XLSB / ODS，会自动交给[内置转换器](/features/conversion)；
- 仍然无法处理的文件（WPS 私有结构、ODT 等）会给出明确的错误原因；如果配置了 `convert`，则自动转换后再预览。

> ℹ️ 内置转换器保留的是**内容和结构**（文字、标题、列表、表格、基本格式、幻灯片文本、表格数值与公式），复杂版式、图表和单元格样式可能丢失。对还原度要求高的场景，可以关闭内置转换器（`builtinConvert: false`），统一交给服务端转换。
