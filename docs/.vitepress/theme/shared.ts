import { withBase } from 'vitepress';
import type { OfficeViewerOptions } from 'office-preview-kit/vue';
// pdf.js worker 由文档站自己打包，PDF 在 Worker 中解析
import pdfWorkerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

/** 文档站所有演示共用的选项（资源路径都带上 base，兼容 GitHub Pages 子路径） */
export const viewerOptions: OfficeViewerOptions = {
  pdfWorkerSrc,
  pdfCMapUrl: withBase('/pdfjs/cmaps/'),
  pdfStandardFontDataUrl: withBase('/pdfjs/standard_fonts/'),
};

/** 示例文件 URL */
export const sample = (name: string) => withBase('/samples/' + encodeURIComponent(name));

export const SAMPLE_GROUPS = [
  { group: 'Word / WPS 文字', items: ['报告示例.docx', '报告示例.doc', '简单文档.doc', 'WPS文字示例.wps', 'WPS文字OOXML.wps', '报告示例.odt'] },
  { group: 'Excel / WPS 表格', items: ['销售数据.xlsx', '销售数据.xls', 'WPS表格示例.et', '销售数据.ods', '客户清单.csv'] },
  { group: 'PPT / WPS 演示', items: ['产品介绍.pptx', '产品介绍.ppt', '简单演示.ppt', 'WPS演示示例.dps'] },
  { group: 'PDF / 其他', items: ['报告示例.pdf', '说明.md'] },
];
