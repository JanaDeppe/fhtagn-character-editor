// CSS
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@/common/woltlab.css";
import "@/common/style.css";

// Libraries
import { createApp } from "vue";
import { createPinia } from "pinia";
import Notifications from "@kyvg/vue3-notification";

// Components
import App from "./App.vue";
import router from "@/router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Notifications);

app.mount("#app");
