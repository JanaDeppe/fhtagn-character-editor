// CSS
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@/common/woltLab.css";
import "@/common/style.css";

// Libraries
import { createApp } from "vue";
import { createPinia } from "pinia";

import Notifications from "@kyvg/vue3-notification";

// Components
import App from "./App.vue";
import router from "@/router";
import i18n from "@/i18n";

const app = createApp(App);

app.use(createPinia());
app.use(i18n);
app.use(router);
app.use(Notifications);

app.mount("#app");
