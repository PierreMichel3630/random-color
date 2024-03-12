import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enGB from "./locales/en-GB.json";
import frFR from "./locales/fr-FR.json";
import deDE from "./locales/de-DE.json";
import esES from "./locales/es-ES.json";
import itIT from "./locales/it-IT.json";

const defaultLanguage = "fr-FR";

export const defaultNamespace = "default";

export const resources = {
  en: {
    [defaultNamespace]: enGB,
  },
  fr: {
    [defaultNamespace]: frFR,
  },
  es: {
    [defaultNamespace]: esES,
  },
  it: {
    [defaultNamespace]: itIT,
  },
  de: {
    [defaultNamespace]: deDE,
  },
};

i18n.use(initReactI18next).init({
  defaultNS: defaultNamespace,
  ns: [defaultNamespace],
  resources,
  lng: defaultLanguage,
  fallbackLng: defaultLanguage,
  interpolation: {
    escapeValue: false,
  },
});
