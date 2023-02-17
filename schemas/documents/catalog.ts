import { SlGlobeAlt } from "react-icons/sl";
import { defineField, defineType } from "sanity";
import supportedLanguages from "../locale/supportedLanguages";

const baseLanguage = supportedLanguages.find((l) => l.isDefault) || supportedLanguages[0];

export default defineType({
  name: "catalog",
  title: "Catalog",
  description: "A list of catalogs associated with some taxonomies",
  type: "document",
  icon: SlGlobeAlt,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "localeString",
      validation: (rule) => rule.required().error("A name is required")
    }),
    defineField({
      name: "taxonomies",
      title: "Taxonomies",
      type: "array",
      validation: (rule) => rule.required().error("One or more taxonomies are required"),
      of: [
        {
          type: "reference",
          to: {
            type: "taxonomy"
          }
        }
      ]
    })
  ],

  preview: {
    select: {
      title: `name.${baseLanguage.id}`
    }
  }
});
