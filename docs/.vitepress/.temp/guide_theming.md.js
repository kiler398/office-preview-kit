import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"样式、主题与国际化","description":"","frontmatter":{},"headers":[],"relativePath":"guide/theming.md","filePath":"guide/theming.md"}');
const _sfc_main = { name: "guide/theming.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="样式、主题与国际化" tabindex="-1">样式、主题与国际化 <a class="header-anchor" href="#样式、主题与国际化" aria-label="Permalink to &quot;样式、主题与国际化&quot;">​</a></h1><ul><li><strong>高度</strong>：组件会填满父容器，父容器必须有明确的高度。</li><li><strong>主题色</strong>：通过 <code>accentColor</code> 选项设置（组件会按文档类型把主题色写在根节点的内联样式上，所以用 CSS 覆盖 <code>--olv-accent</code> 不会生效）。</li><li><strong>其他 CSS 变量</strong>：</li></ul><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">.olv-root</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">  --olv-bg</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">#f0f2f5</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">;       </span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">/* 页面背景（页面之间的灰底） */</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">  --olv-bar-h</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">44</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">px</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">;       </span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">/* 顶栏高度 */</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">}</span></span></code></pre></div><ul><li><strong>主要类名</strong>：<code>.olv-root</code>、<code>.olv-bar</code>（顶栏）、<code>.olv-search</code>（搜索栏）、<code>.olv-stage</code>（内容区）、<code>.olv-tabs</code>（工作表标签）、<code>.olv-pagebadge</code>（浮动页码）、<code>.olv-anno-layer</code>（绘制层）。</li><li><strong>响应式</strong>：断点基于<strong>组件自身的宽度</strong>（CSS 容器查询），而不是浏览器窗口宽度。即使把组件嵌在手机尺寸的框里，也会切换到紧凑工具栏。</li><li><strong>国际化</strong>：<code>locale: &#39;zh-CN&#39; | &#39;en&#39;</code>。</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/theming.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const theming = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  theming as default
};
