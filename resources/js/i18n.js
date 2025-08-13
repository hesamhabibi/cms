// i18n bootstrap (initialized from Inertia shared props in app.tsx/ssr.tsx)
// Comments in English.
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

export const i18n = i18next;

export async function initI18n(
    resources = { en: { common: {} }, fa: { common: {} } },
    locale = 'en',
) {
    if (!i18n.isInitialized) {
        await i18n.use(initReactI18next).init({
            resources,
            lng: locale,
            fallbackLng: 'en',
            defaultNS: 'common',
            interpolation: { escapeValue: false },
            returnEmptyString: false,
        });
    } else {
        // Update resources and language on the fly
        Object.entries(resources).forEach(([lng, namespaces]) => {
            Object.entries(namespaces).forEach(([ns, data]) => {
                i18n.addResourceBundle(lng, ns, data, true, true);
            });
        });
        await i18n.changeLanguage(locale);
    }
}

export default i18n;


