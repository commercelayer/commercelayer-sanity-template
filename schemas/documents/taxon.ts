import { BiCheckboxSquare } from "react-icons/bi";
import { defineField, defineType } from "sanity";
import supportedLanguages from "../locale/supportedLanguages";

const baseLanguage = supportedLanguages.find((l) => l.isDefault) || supportedLanguages[0];

export default defineType({
  name: "taxon",
  title: "Taxon",
  description: "",
  type: "document",
  icon: BiCheckboxSquare,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "localeString",
      validation: (rule) => rule.required().error("A name is required")
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "localeString"
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "localeSlug",
      options: {
        source: "Name"
      },
      validation: (rule) => rule.required().error("A slug is required")
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localeText"
    }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [
        {
          type: "reference",
          to: {
            type: "product"
          }
        }
      ],
      validation: (rule) => rule.warning("One or more products are required")
    }),
    defineField({
      name: "taxons",
      title: "Taxons",
      type: "array",
      of: [
        {
          type: "reference",
          to: {
            type: "taxon"
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
