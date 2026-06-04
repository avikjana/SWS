// Sanity CMS Course Schema
import { defineField, defineType } from "sanity";

export const courseSchema = defineType({
  name: "course",
  title: "Course",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Course Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Class 9-10", value: "class-9-10" },
          { title: "Class 11-12 Science", value: "class-11-12-science" },
          { title: "Class 11-12 Commerce", value: "class-11-12-commerce" },
          { title: "JEE Preparation", value: "jee" },
          { title: "NEET Preparation", value: "neet" },
          { title: "WBJEE Preparation", value: "wbjee" },
          { title: "Computer Science", value: "cs" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "longDescription",
      title: "Long Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      placeholder: "e.g., 1 Year / 2 Years",
    }),
    defineField({
      name: "fees",
      title: "Fees (INR)",
      type: "number",
    }),
    defineField({
      name: "feesDisplay",
      title: "Fees Display Text",
      type: "string",
      placeholder: "e.g., ₹45,000/year",
    }),
    defineField({
      name: "features",
      title: "Course Features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "subjects",
      title: "Subjects Covered",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "batchSize",
      title: "Max Batch Size",
      type: "number",
    }),
    defineField({
      name: "image",
      title: "Course Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "icon",
      title: "Icon (emoji or icon name)",
      type: "string",
    }),
    defineField({
      name: "badge",
      title: "Badge Text",
      type: "string",
      placeholder: "e.g., Most Popular, New Batch",
    }),
    defineField({
      name: "isPopular",
      title: "Mark as Popular",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
