import { useIntersectionObserver } from "@vueuse/core";

import ImageView from "@/components/ImageView/index.vue";
import Sku from "@/components/Sku/index.vue";
// 定义懒加载指令

export const LazyLoaddPlugin = {
  install(app) {
    app.directive("lazy-img", {
      mounted(el, binding) {
        // el: 指令所绑定的元素，可以用来直接操作 DOM 。
        // binding: 一个对象，包含以下属性：
        //   name: 指令名，不包括 v- 前缀。
        //   value: 指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
        //   oldValue: 指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。
        //   expression: 绑定值的字符串形式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
        //   arg: 传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
        //   modifiers: 一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
        //   vnode: Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
        //   oldVnode: 上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          if (isIntersecting) {
            el.src = binding.value;
            stop();
          }
        });
      },
    });
  },
};

// 把components下的所有组件都全局注册;

export const componentPlugin = {
  install(app) {
    // app.component('组件名',组件配置对象)
    app.component("com-image-view", ImageView);
    app.component("com-sku", Sku);
  },
};
