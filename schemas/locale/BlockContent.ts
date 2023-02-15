import supportedLanguages from "./supportedLanguages";

export default {
  name: "localeBlockContent",
  title: "Locale block content",
  type: "object",
  fieldsets: [
    {
      title: "Translations",
      name: "translations",
      options: { collapsible: true }
    }
  ],
  fields: supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: "blockContent",
    fieldset: lang.isDefault ? null : "translations"
  }))
};
