import translations from '../translations.json';

type Translations = typeof translations;
type Language = keyof Translations;
type TranslationKeys = keyof Translations[Language];

const i18n = (key: TranslationKeys) => {
  const language = 'pt-BR' as Language;

  return translations[language][key];
};

export { i18n };
