import { defineField, defineType } from "sanity";

export const orderProduct = defineType({
  name: "orderProduct",
  title: "Order Product",
  type: "object",
  fields: [
    defineField({
      name: "product",
      title: "Product",
      type: "reference",
      to: [{ type: "product" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "quantity",
      title: "Quantity",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "product.name",
      media: "product.image",
      subtitle: "quantity",
    },
    prepare(select) {
      return {
        title: select.title,
        subtitle: `Quantity: ${select.subtitle}`,
        media: select.media ? select.media[0] : null,
      };
    },
  },
});
