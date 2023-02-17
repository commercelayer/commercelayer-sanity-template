import { VscTypeHierarchySub } from "react-icons/vsc";
import { defineField, defineType } from "sanity";
import supportedLanguages from "../locale/supportedLanguages";

const baseLanguage = supportedLanguages.find((l) => l.isDefault) || supportedLanguages[0];

export default defineType({
  name: "variant",
  title: "Variant",
  description: "",
  type: "document",
  icon: VscTypeHierarchySub,
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
      validation: (rule) => rule.required().error("A variant code is required")
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localeText"
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
      validation: (rule) => rule.required().error("One or more images are required")
    }),
    defineField({
      name: "size",
      title: "Size",
      type: "reference",
      to: {
        type: "size"
      },
      validation: (rule) => rule.required().error("A size is required")
    })
  ],

  preview: {
    select: {
      title: `name.${baseLanguage.id}`,
      media: "images.0.images"
    }
  }
});
