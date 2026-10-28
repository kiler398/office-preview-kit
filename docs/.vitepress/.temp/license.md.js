import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"许可协议","description":"","frontmatter":{},"headers":[],"relativePath":"license.md","filePath":"license.md"}');
const _sfc_main = { name: "license.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="许可协议" tabindex="-1">许可协议 <a class="header-anchor" href="#许可协议" aria-label="Permalink to &quot;许可协议&quot;">​</a></h1><p><strong>office-preview-kit 不是开源软件</strong>：源码不公开。但通过 npm 发布的成品（<a href="https://www.npmjs.com/package/office-preview-kit" target="_blank" rel="noreferrer">office-preview-kit</a>）<strong>可以免费用于个人和商业项目</strong>，包括集成到你的网站、应用、SaaS 服务中一起分发和销售，无需向作者付费。</p><h2 id="你可以" tabindex="-1">你可以 <a class="header-anchor" href="#你可以" aria-label="Permalink to &quot;你可以&quot;">​</a></h2><ul><li>免费下载、安装和使用 npm 上发布的版本，用途包括个人、教育、企业内部和商业用途；</li><li>把组件集成到你的产品中，随产品一起分发、部署和销售。</li></ul><h2 id="你不可以" tabindex="-1">你不可以 <a class="header-anchor" href="#你不可以" aria-label="Permalink to &quot;你不可以&quot;">​</a></h2><ul><li>对组件进行反向工程、反编译或反汇编，试图获取源码（适用法律明确允许的除外）；</li><li>把组件单独出售、出租、再许可，或者作为独立的组件库 / SDK 再发布；</li><li>删除或修改组件中的版权与许可信息，或者声称组件由你开发。</li></ul><h2 id="无担保" tabindex="-1">无担保 <a class="header-anchor" href="#无担保" aria-label="Permalink to &quot;无担保&quot;">​</a></h2><p>组件按“现状”提供，不附带任何担保；作者不对使用组件造成的损失承担责任。</p><p>完整条款以 npm 包中的 <a href="https://github.com/kiler398/office-preview-kit/blob/main/LICENSE" target="_blank" rel="noreferrer"><code>LICENSE</code></a> 文件为准（中英双语）。</p><h2 id="第三方开源组件" tabindex="-1">第三方开源组件 <a class="header-anchor" href="#第三方开源组件" aria-label="Permalink to &quot;第三方开源组件&quot;">​</a></h2><p>组件包含或依赖以下开源组件，它们按各自的许可证授权，完整清单见 npm 包中的 <code>THIRD_PARTY_NOTICES.md</code>。</p><table tabindex="0"><thead><tr><th>依赖</th><th>用途</th><th>许可</th></tr></thead><tbody><tr><td><a href="https://www.npmjs.com/package/@silurus/ooxml" target="_blank" rel="noreferrer"><code>@silurus/ooxml</code></a></td><td>DOCX / XLSX / PPTX 渲染（Rust/WASM + Canvas）</td><td>MIT</td></tr><tr><td><a href="https://www.npmjs.com/package/@silurus/ooxml-legacy-office" target="_blank" rel="noreferrer"><code>@silurus/ooxml-legacy-office</code></a></td><td>DOC / XLS / PPT 实验性读取</td><td>MIT</td></tr><tr><td><a href="https://www.npmjs.com/package/pdfjs-dist" target="_blank" rel="noreferrer"><code>pdfjs-dist</code></a></td><td>PDF 渲染</td><td>Apache-2.0</td></tr><tr><td><a href="https://crates.io/crates/office_oxide" target="_blank" rel="noreferrer"><code>office_oxide</code></a>（编译进内置转换器）</td><td>DOC / PPT / XLS → OOXML</td><td>MIT / Apache-2.0</td></tr><tr><td><a href="https://crates.io/crates/calamine" target="_blank" rel="noreferrer"><code>calamine</code></a>（编译进内置转换器）</td><td>XLSB / ODS / XLS 读取</td><td>MIT</td></tr><tr><td><a href="https://crates.io/crates/rust_xlsxwriter" target="_blank" rel="noreferrer"><code>rust_xlsxwriter</code></a>（编译进内置转换器）</td><td>生成 XLSX</td><td>MIT / Apache-2.0</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("license.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const license = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  license as default
};
