import { TfiFlagAlt2 } from "react-icons/tfi";
import { defineField, defineType } from "sanity";
import supportedLanguages from "../locale/supportedLanguages";

const baseLanguage = supportedLanguages.find((l) => l.isDefault) || supportedLanguages[0];

export default defineType({
  name: "country",
  title: "Country",
  description: "A country representing a market in Commerce Layer",
  type: "document",
  icon: TfiFlagAlt2,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "localeString",
      validation: (rule) => rule.required().error("A name is required")
    }),
    defineField({
      name: "code",
      title: "Code",
      type: "string",
      validation: (rule) =>
        rule.required().min(2).max(4).error("A code of min. 2 characters and max. 4 characters is required")
    }),
    defineField({
      name: "catalog",
      title: "Catalog",
      type: "reference",
      to: [
        {
          type: "catalog"
        }
      ],
      validation: (rule) => rule.required().error("A catalog is required")
    }),
    defineField({
      name: "marketId",
      title: "Market Id",
      type: "string",
      validation: (rule) => rule.required().error("A market ID is required")
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      validation: (rule) => rule.required().error("An image is required")
    }),
    defineField({
      name: "defaultLocale",
      title: "DefaultLocale",
      type: "string"
    }),
    defineField({
      name: "domain",
      title: "Domain",
      type: "string"
    })
  ],

  preview: {
    select: {
      title: `name.${baseLanguage.id}`,
      media: "image"
    }
  }
});
