import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"TypeScript 类型","description":"","frontmatter":{},"headers":[],"relativePath":"api/types.md","filePath":"api/types.md"}');
const _sfc_main = { name: "api/types.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="typescript-类型" tabindex="-1">TypeScript 类型 <a class="header-anchor" href="#typescript-类型" aria-label="Permalink to &quot;TypeScript 类型&quot;">​</a></h1><p>包内附带完整的类型声明。常用类型：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">import</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}"> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  OfficeViewerOptions, ViewerSource, LoadedInfo, ViewerError, ConvertRequest, ConvertResult,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  ViewerEventMap, ViewerEventName, PagePoint,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  Annotation, AnnotationInput, AnnotationTool, ToolStyle, LayerContext,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  PageOverlay, OverlayInfo, PageImageOptions, WatermarkOptions,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  DocumentRenderer, StandaloneOptions, DetectResult,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">} </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">from</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &#39;office-preview-kit&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">;</span></span></code></pre></div><p><code>ViewerError.code</code> 的取值：</p><table tabindex="0"><thead><tr><th>code</th><th>含义</th></tr></thead><tbody><tr><td><code>fetch-failed</code></td><td>下载文件失败（网络错误或 HTTP 状态码非 2xx）</td></tr><tr><td><code>unsupported</code></td><td>不支持的格式</td></tr><tr><td><code>needs-conversion</code></td><td>需要配置 <code>convert</code>，或转换失败</td></tr><tr><td><code>encrypted</code></td><td>文件已加密</td></tr><tr><td><code>render-failed</code></td><td>解析或渲染失败</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("api/types.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const types = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  types as default
};
