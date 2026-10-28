import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _imports_0 = "/office-preview-kit/images/desktop.jpg";
const _imports_1 = "/office-preview-kit/images/mobile.jpg";
const __pageData = JSON.parse('{"title":"介绍","description":"","frontmatter":{},"headers":[],"relativePath":"guide/introduction.md","filePath":"guide/introduction.md"}');
const _sfc_main = { name: "guide/introduction.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h1><p><strong>office-preview-kit</strong> 是纯前端、只读的 <strong>Office / WPS / PDF 在线预览组件</strong>。同一个核心可在 <strong>Vue 3</strong>、<strong>React</strong>、<strong>Web Component</strong> 和原生 JS 中使用。界面仿照 OnlyOffice 移动端只读模式：工具栏精简，手机和 PC 都能用。</p><p><img${ssrRenderAttr("src", _imports_0)} alt="PC 端预览：缩略图、批注、水印、页码浮层"></p><blockquote><p>组件源码不公开，通过 npm 发布的成品<strong>可以免费商用</strong>，详见<a href="/office-preview-kit/license">许可协议</a>。</p></blockquote><table tabindex="0"><thead><tr><th>能力</th><th>说明</th></tr></thead><tbody><tr><td>多格式预览</td><td>DOCX / XLSX / PPTX、DOC / XLS / PPT（实验性）、WPS 文字 / 表格 / 演示、PDF、CSV、TXT / MD、图片</td></tr><tr><td>纯前端渲染</td><td>Office 文件通过 WebAssembly + Canvas 在浏览器中渲染，<strong>不需要部署 Office 服务端</strong></td></tr><tr><td>移动端只读样式</td><td>仿 OnlyOffice 移动端：按文档类型着色的顶栏、连续滚动、浮动页码、表格底部 Sheet 标签、双指缩放</td></tr><tr><td>PC 端适配</td><td>组件宽度大于 560px 时显示缩放按钮，支持 Ctrl/⌘ + 滚轮缩放、Ctrl/⌘ + F 搜索、全屏</td></tr><tr><td>文档搜索</td><td>所有格式都可搜索，支持上一个 / 下一个，PDF 中高亮命中位置</td></tr><tr><td>pdf.js 兼容 API</td><td><code>eventBus.on(&#39;pagechanging&#39;)</code>、<code>currentPageNumber</code>、<code>currentScale</code>、<code>scrollPageIntoView</code> 等</td></tr><tr><td>批注 / 绘制层</td><td>画笔、荧光笔、矩形、高亮框、文字、橡皮、自定义工具；可导出 JSON 持久化</td></tr><tr><td>页面渲染为图片</td><td>当前页、指定页、批量、表格指定区域；合成时可带批注和浮层</td></tr><tr><td>浮层叠加</td><td>同一个绘制函数，既实时显示在屏幕上，也会合成进导出的图片（水印、页码、印章等）</td></tr><tr><td>独立渲染</td><td>不挂载预览器也能把文件的任意页渲染成图片（文件列表缩略图、批量出图）</td></tr><tr><td>内置格式转换器</td><td>Rust 编写、编译为 WebAssembly，在浏览器中把 DOC / PPT / WPS / XLSB / ODS 转成 OOXML 后预览，<strong>不需要服务端</strong></td></tr><tr><td>服务端转换兜底</td><td>内置转换器也处理不了的格式（ODT / ODP / RTF / OFD 等）自动交给你的转换服务</td></tr><tr><td>SSR 安全</td><td>可在 Nuxt / Next.js 服务端渲染环境中被导入，不会报错</td></tr></tbody></table><p><img${ssrRenderAttr("src", _imports_1)} alt="手机尺寸：DOCX 搜索、PDF 搜索高亮、WPS 表格、PPTX、ODT 经转换后预览"></p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/introduction.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const introduction = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  introduction as default
};
