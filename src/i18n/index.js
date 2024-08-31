import { createI18n } from "vue-i18n";

import translationsEn from "@/i18n/translations.en";
import translationsDe from "@/i18n/translations.de";

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "de",
  messages: { en: translationsEn, de: translationsDe },
});

export default i18n;
