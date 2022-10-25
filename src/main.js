// CSS
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@/common/woltLab.css";
import "@/common/style.css";

// Libraries
import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";

import Notifications from "@kyvg/vue3-notification";

// Components
import App from "./App.vue";
import router from "@/router";

import translationsEn from "./common/translations.en";
import translationsDe from "./common/translations.de";

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "de",
  messages: { en: translationsEn, de: translationsDe },
});

const app = createApp(App);

app.use(createPinia());
app.use(i18n);
app.use(router);
app.use(Notifications);

app.mount("#app");
