# 许可协议

**office-preview-kit 不是开源软件**：源码不公开。但通过 npm 发布的成品（[office-preview-kit](https://www.npmjs.com/package/office-preview-kit)）**可以免费用于个人和商业项目**，包括集成到你的网站、应用、SaaS 服务中一起分发和销售，无需向作者付费。

## 你可以

- 免费下载、安装和使用 npm 上发布的版本，用途包括个人、教育、企业内部和商业用途；
- 把组件集成到你的产品中，随产品一起分发、部署和销售。

## 你不可以

- 对组件进行反向工程、反编译或反汇编，试图获取源码（适用法律明确允许的除外）；
- 把组件单独出售、出租、再许可，或者作为独立的组件库 / SDK 再发布；
- 删除或修改组件中的版权与许可信息，或者声称组件由你开发。

## 无担保

组件按“现状”提供，不附带任何担保；作者不对使用组件造成的损失承担责任。

完整条款以 npm 包中的 [`LICENSE`](https://github.com/kiler398/office-preview-kit/blob/main/LICENSE) 文件为准（中英双语）。

## 第三方开源组件

组件包含或依赖以下开源组件，它们按各自的许可证授权，完整清单见 npm 包中的 `THIRD_PARTY_NOTICES.md`。

| 依赖 | 用途 | 许可 |
|---|---|---|
| [`@silurus/ooxml`](https://www.npmjs.com/package/@silurus/ooxml) | DOCX / XLSX / PPTX 渲染（Rust/WASM + Canvas） | MIT |
| [`@silurus/ooxml-legacy-office`](https://www.npmjs.com/package/@silurus/ooxml-legacy-office) | DOC / XLS / PPT 实验性读取 | MIT |
| [`pdfjs-dist`](https://www.npmjs.com/package/pdfjs-dist) | PDF 渲染 | Apache-2.0 |
| [`office_oxide`](https://crates.io/crates/office_oxide)（编译进内置转换器） | DOC / PPT / XLS → OOXML | MIT / Apache-2.0 |
| [`calamine`](https://crates.io/crates/calamine)（编译进内置转换器） | XLSB / ODS / XLS 读取 | MIT |
| [`rust_xlsxwriter`](https://crates.io/crates/rust_xlsxwriter)（编译进内置转换器） | 生成 XLSX | MIT / Apache-2.0 |
