import supportedLanguages from './supportedLanguages'

export default {
  name: 'localeSlug',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: {collapsible: true},
    },
  ],
  fields: supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: 'slug',
    fieldset: lang.isDefault ? null : 'translations',
    options: {
      source: `name.${lang.id}`,
      maxLength: 200,
    },
  })),
}
