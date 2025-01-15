import { createI18n } from 'vue-i18n'
import { langStore } from "@/store/lang";

let i18n;
export async function installI18n(app) {
    console.log(langStore().locale)
    const i18na = createI18n({
        legacy: false,
        globalInjection: true,
        locale: langStore().locale, // set locale
        fallbackLocale: 'es', // set fallback locale
        messages: {}
    });
    i18n = i18na;
    app.use(i18n);
    loadMessages(langStore().locale);
    return i18n;
}

/**
 * @param {String} locale
 */
export async function loadMessages (locale) {
    if (Object.keys(i18n.global.getLocaleMessage(locale)).length === 0) {
        const messages = await import(/* webpackChunkName: '' */ `../lang/${locale}.json`);
        i18n.global.setLocaleMessage(locale, messages);
    }
    if (i18n.locale !== locale) {
        i18n.locale = locale
        i18n.global.locale.value = locale;
    }
};

export default i18n;
