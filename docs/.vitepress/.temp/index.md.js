import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse(`{"title":"","description":"","frontmatter":{"layout":"home","hero":{"name":"office-preview-kit","text":"Office / WPS / PDF 在线预览组件","tagline":"纯前端渲染 · 仿 OnlyOffice 移动端只读体验 · Vue 3 / React / Web Component 通用","image":{"src":"/images/mobile.jpg","alt":"移动端预览效果"},"actions":[{"theme":"brand","text":"快速开始","link":"/guide/quick-start"},{"theme":"alt","text":"在线演示","link":"/playground"},{"theme":"alt","text":"npm","link":"https://www.npmjs.com/package/office-preview-kit"}]},"features":[{"icon":"📄","title":"多格式预览","details":"DOCX / XLSX / PPTX、DOC / XLS / PPT、WPS 文字 / 表格 / 演示、PDF、ODS、CSV、TXT、图片。按文件内容识别格式，不看扩展名。"},{"icon":"⚡","title":"纯前端，无需 Office 服务端","details":"Office 文件通过 WebAssembly + Canvas 在浏览器中渲染；旧格式和 WPS 由内置的 Rust/WASM 转换器在浏览器里转换。"},{"icon":"📱","title":"手机和 PC 都好用","details":"仿 OnlyOffice 移动端只读模式：按文档类型着色的顶栏、精简工具栏、连续滚动、浮动页码、双指缩放；PC 端自动显示缩放按钮。"},{"icon":"🧭","title":"pdf.js 兼容的翻页 API","details":"eventBus.on('pagechanging')、currentPageNumber、currentScale、scrollPageIntoView 等，从 pdf.js 迁移几乎零成本。"},{"icon":"✍️","title":"批注与绘制层","details":"画笔、荧光笔、矩形、高亮框、文字、橡皮、自定义工具；按页归一化坐标存储，可导出 JSON 持久化。"},{"icon":"🖼️","title":"页面渲染为图片","details":"当前页、指定页、批量导出，表格可指定单元格区域；批注、水印、页码等浮层在导出时一并合成。"}]},"headers":[],"relativePath":"index.md","filePath":"index.md"}`);
const _sfc_main = { name: "index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_BasicDemo = resolveComponent("BasicDemo");
  _push(`<div${ssrRenderAttrs(_attrs)}><div class="vp-doc" style="${ssrRenderStyle({ "max-width": "1152px", "margin": "48px auto 0", "padding": "0 24px" })}"><h2 id="试一试" tabindex="-1">试一试 <a class="header-anchor" href="#试一试" aria-label="Permalink to &quot;试一试&quot;">​</a></h2><p>下面的预览器直接安装自 npm 上发布的 <code>office-preview-kit</code>。切换文件，或者打开你自己的本地文件试试：</p>`);
  _push(ssrRenderComponent(_component_ClientOnly, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_BasicDemo, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_BasicDemo)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">npm</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> i</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> office-preview-kit</span></span></code></pre></div><blockquote><p>组件源码不公开，npm 上发布的成品<strong>可以免费商用</strong>，详见<a href="/office-preview-kit/license">许可协议</a>。</p></blockquote></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
