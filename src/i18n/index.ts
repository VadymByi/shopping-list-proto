import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

import en from "./en.json";
import uk from "./uk.json";

// CONSTANTS
const LANGUAGE_KEY = "user-language";

// LANGUAGE DETECTOR
const languageDetector = {
  type: "languageDetector" as const,
  async: true,
  detect: async (callback: (lang: string) => void) => {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
      callback(savedLanguage || "uk");
    } catch (error) {
      console.error("Error detecting language:", error);
      callback("uk");
    }
  },
  init: () => {},
  cacheUserLanguage: async (language: string) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, language);
    } catch (error) {
      console.error("Error saving language:", error);
    }
  },
};

// I18N INITIALIZATION
i18n
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    compatibilityJSON: "v4",

    resources: {
      en: { translation: en },
      uk: { translation: uk },
    },

    fallbackLng: "uk",

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;
