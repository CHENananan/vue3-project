import "@/styles/common.scss"; // global css

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "@/App.vue";
import router from "@/router";
import { LazyLoaddPlugin, componentPlugin } from "@/directives";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(LazyLoaddPlugin);
app.use(componentPlugin);

app.mount("#app");
