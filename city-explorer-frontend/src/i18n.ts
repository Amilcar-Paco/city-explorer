import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import pt from "./locales/pt.json";

interface Resources {
  [key: string]: { translation: Record<string, string> };
}

const resources: Resources = {
  en: { translation: en },
  pt: { translation: pt },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: process.env.REACT_APP_DEFAULT_LANGUAGE || "en",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
