import { defineField, defineType } from "sanity";
import { CheckmarkCircleIcon } from "@sanity/icons";

export const order = defineType({
  name: "order",
  title: "Order",
  type: "document",
  icon: CheckmarkCircleIcon,
  fields: [
    defineField({
      name: "orderNumber",
      title: "Order Number",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "surname",
      title: "Surname",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "totalPrice",
      title: "Total Price",
      type: "number",
      readOnly: true,
    }),
    defineField({
      name: "totalQuantity",
      title: "Total Quantity",
      type: "number",
      readOnly: true,
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      readOnly: true,
      of: [
        {
          type: "orderProduct",
        },
      ],
    }),
    defineField({
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          {
            title: "Pending",
            value: "pending",
          },
          {
            title: "Delivered",
            value: "delivered",
          },
          {
            title: "Cancelled",
            value: "cancelled",
          },
        ],
        layout: "dropdown",
      },
      initialValue: "pending",
    }),
  ],
  preview: {
    select: {
      orderNumber: "orderNumber",
      status: "status",
      email: "email",
    },
    prepare(select) {
      return {
        title: select.orderNumber,
        subtitle: `${select.status} - ${select.email}`,
      };
    },
  },
});
