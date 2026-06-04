// Sanity CMS Gallery Schema
import { defineField, defineType } from "sanity";

export const gallerySchema = defineType({
  name: "gallery",
  title: "Gallery Image",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Campus", value: "campus" },
          { title: "Events", value: "events" },
          { title: "Seminars", value: "seminars" },
          { title: "Workshops", value: "workshops" },
          { title: "Celebrations", value: "celebrations" },
          { title: "Infrastructure", value: "infrastructure" },
        ],
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
});
