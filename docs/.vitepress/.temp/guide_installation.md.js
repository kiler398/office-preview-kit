import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"安装与环境要求","description":"","frontmatter":{},"headers":[],"relativePath":"guide/installation.md","filePath":"guide/installation.md"}');
const _sfc_main = { name: "guide/installation.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="安装与环境要求" tabindex="-1">安装与环境要求 <a class="header-anchor" href="#安装与环境要求" aria-label="Permalink to &quot;安装与环境要求&quot;">​</a></h1><p>组件发布在 npm：<a href="https://www.npmjs.com/package/office-preview-kit" target="_blank" rel="noreferrer">office-preview-kit</a>。</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">npm</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> i</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> office-preview-kit</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 或</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">pnpm</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> add</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> office-preview-kit</span></span></code></pre></div><ul><li><strong>框架</strong>：<code>vue &gt;= 3.2</code> 和 <code>react &gt;= 17</code> 都是<strong>可选</strong>的 peerDependency，只在用到对应包装组件时才需要安装。</li><li><strong>浏览器</strong>：需要支持 ES2020、WebAssembly、Web Worker 和 <code>createImageBitmap</code> 的现代浏览器（Chrome / Edge / Firefox 最新版、iOS / macOS Safari 较新版本）。上线前请在目标浏览器上实测。</li><li><strong>模块格式</strong>：仅提供 ESM。</li><li><strong>入口</strong>：</li></ul><table tabindex="0"><thead><tr><th>导入路径</th><th>内容</th></tr></thead><tbody><tr><td><code>office-preview-kit</code></td><td>核心类 <code>OfficeViewer</code>、独立渲染函数、工具函数与全部类型</td></tr><tr><td><code>office-preview-kit/vue</code></td><td>Vue 3 组件</td></tr><tr><td><code>office-preview-kit/react</code></td><td>React 组件</td></tr><tr><td><code>office-preview-kit/element</code></td><td>导入后自动注册 <code>&lt;office-viewer&gt;</code> 自定义元素</td></tr></tbody></table><p>各格式的渲染器<strong>按需动态加载</strong>：打开 PDF 时不会下载 Office 解析器，反之亦然。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/installation.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const installation = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  installation as default
};
