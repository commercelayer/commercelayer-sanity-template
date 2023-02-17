import { TfiShoppingCartFull } from "react-icons/tfi";
import { defineField, defineType } from "sanity";
import supportedLanguages from "../locale/supportedLanguages";

const baseLanguage = supportedLanguages.find((l) => l.isDefault) || supportedLanguages[0];

export default defineType({
  name: "product",
  title: "Product",
  description: "A list of products associated with some variants",
  type: "document",
  icon: TfiShoppingCartFull,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "localeString",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localeText"
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "localeSlug",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "reference",
      title: "Reference",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "reference",
          to: {
            type: "productImage"
          }
        }
      ],
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "variants",
      title: "Variants",
      type: "array",
      of: [
        {
          type: "reference",
          to: {
            type: "variant"
          }
        }
      ],
      validation: (rule) => rule.required()
    })
  ],

  preview: {
    select: {
      title: `name.${baseLanguage.id}`,
      subtitle: `slug.${baseLanguage.id}.current`,
      media: "images.0.images"
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title,
        subtitle: `/${subtitle}`,
        media: media
      };
    }
  }
});
