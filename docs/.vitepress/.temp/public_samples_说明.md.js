import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"示例说明","description":"","frontmatter":{},"headers":[],"relativePath":"public/samples/说明.md","filePath":"public/samples/说明.md"}');
const _sfc_main = { name: "public/samples/说明.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="示例说明" tabindex="-1">示例说明 <a class="header-anchor" href="#示例说明" aria-label="Permalink to &quot;示例说明&quot;">​</a></h1><p>这是一个 Markdown 纯文本预览示例。</p><ul><li>支持 UTF-8 / GBK 自动识别</li><li>支持搜索高亮</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("public/samples/说明.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  __ as default
};
