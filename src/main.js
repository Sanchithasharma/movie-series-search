import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import mitt from 'mitt'
import { store } from "./store/watchlist";


const emitter = mitt()
const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(ElementPlus);
app.config.globalProperties.emitter = emitter
app.use(store)  
app.mount("#app");
