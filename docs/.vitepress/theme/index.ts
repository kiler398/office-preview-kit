import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import './custom.css';
import Playground from './components/Playground.vue';
import BasicDemo from './components/demos/BasicDemo.vue';
import NavigationDemo from './components/demos/NavigationDemo.vue';
import AnnotationDemo from './components/demos/AnnotationDemo.vue';
import ExportDemo from './components/demos/ExportDemo.vue';
import OverlayDemo from './components/demos/OverlayDemo.vue';
import StandaloneDemo from './components/demos/StandaloneDemo.vue';
import ConvertDemo from './components/demos/ConvertDemo.vue';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 演示组件依赖浏览器 API，Markdown 中统一包在 <ClientOnly> 里使用
    app.component('Playground', Playground);
    app.component('BasicDemo', BasicDemo);
    app.component('NavigationDemo', NavigationDemo);
    app.component('AnnotationDemo', AnnotationDemo);
    app.component('ExportDemo', ExportDemo);
    app.component('OverlayDemo', OverlayDemo);
    app.component('StandaloneDemo', StandaloneDemo);
    app.component('ConvertDemo', ConvertDemo);
  },
} satisfies Theme;
