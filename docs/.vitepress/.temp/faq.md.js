import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"常见问题","description":"","frontmatter":{},"headers":[],"relativePath":"faq.md","filePath":"faq.md"}');
const _sfc_main = { name: "faq.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="常见问题" tabindex="-1">常见问题 <a class="header-anchor" href="#常见问题" aria-label="Permalink to &quot;常见问题&quot;">​</a></h1><p><strong>Q：组件区域一片空白？</strong> 父容器没有高度。给组件或父容器设置 <code>height</code>。</p><p><strong>Q：中文 PDF 显示乱码或方框？</strong> 缺少 CMap。内网环境请按照 <a href="/office-preview-kit/guide/bundlers#内网-离线部署">5.4</a> 自行托管 <code>cmaps</code> 和 <code>standard_fonts</code>。</p><p><strong>Q：字体和 Office 中显示的不一样？</strong> 浏览器只能使用访问者本机已安装的字体。文档使用的字体在本机不存在时，会按 <code>cjkFallback</code> 回退。对版式要求严格的文件，建议转换成 PDF 后再预览。</p><p><strong>Q：Excel 公式单元格是空的？</strong> 组件只显示文件中缓存的计算结果，不执行公式计算。由 Excel 或 WPS 保存的文件都带有缓存值；由程序生成且没有缓存值的文件（例如 openpyxl 写入的公式）会显示为空。</p><p><strong>Q：PPT 的动画和切换效果不播放？</strong> 目前只支持静态幻灯片，不支持动画和切换效果。</p><p><strong>Q：DOC / PPT / WPS 文件打开后格式有变化？</strong> 这类文件通常是经过内置转换器转换的（徽标显示为 <code>DOC→DOCX</code> 等）。内置转换器只保留内容和结构；对版式要求高时，请设置 <code>builtinConvert: false</code> 并配置服务端 <a href="/office-preview-kit/features/conversion"><code>convert</code></a>。</p><p><strong>Q：手机上开了画笔后无法滚动？</strong> 绘制工具激活时，触摸操作用于绘制。切回 <code>setTool(&#39;none&#39;)</code> 即可滚动。</p><p><strong>Q：数学公式没有显示？</strong> 默认不加载公式引擎。请传入 <code>options.math</code>：<code>import { math } from &#39;@silurus/ooxml/math&#39;</code>。</p><p><strong>Q：大文件很慢或内存占用高？</strong> 大型 XLSX 默认有单表 10 万行的读取上限。可以把超大文件在服务端转换成 PDF，或者在服务端先做抽样再预览。</p><p><strong>Q：能编辑吗？</strong> 不能。本组件只做预览；需要编辑请接入 OnlyOffice、WPS 等编辑方案。</p><h2 id="已知限制" tabindex="-1">已知限制 <a class="header-anchor" href="#已知限制" aria-label="Permalink to &quot;已知限制&quot;">​</a></h2><ul><li>仅预览，不提供编辑、保存或回写原文件。</li><li>渲染还原度不等同于 Microsoft Office / WPS。合同、监管报表等对版式要求严格的文件，上线前请用真实样本验证，或者改为服务端转换成 PDF 后预览。</li><li>XLSX 不计算公式；PPTX 不播放动画和切换效果。</li><li>DOC / PPT / WPS 的直接读取是实验性功能；读取失败时由内置转换器转换，结果只保留内容和结构。</li><li>ODT / ODP / RTF / OFD 需要服务端转换。</li><li>CSV / TSV 导出图片时只能截取当前可见区域，不能指定 <code>range</code>；纯文本不支持渲染为图片；表格没有页面绘制层。</li><li>DOCX / PPTX 的绘制层依赖底层渲染库的页面 DOM 结构，升级底层渲染库前需要回归测试。</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("faq.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const faq = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  faq as default
};
