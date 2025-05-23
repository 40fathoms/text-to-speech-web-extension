import translations from '../translations.json';

type Translations = typeof translations;
type Language = keyof Translations;
type TranslationKeys = keyof Translations[Language];

/**
 * Retrieves the translation for a given key based on the current language.
 *
 * @param {TranslationKeys} key - The key corresponding to the desired translation string.
 * @param {Language} language - The current language for which the translation is needed.
 * @returns {string} The translated string for the specified key in the current language.
 *
 */
const i18n = (key: TranslationKeys, language: Language) => {
  return translations[language][key];
};

export { i18n };
