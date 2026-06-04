// Sanity CMS Result / Topper Schema
import { defineField, defineType } from "sanity";

export const resultSchema = defineType({
  name: "result",
  title: "Result / Topper",
  type: "document",
  fields: [
    defineField({
      name: "studentName",
      title: "Student Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Student Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "exam",
      title: "Exam / Board",
      type: "string",
      options: {
        list: [
          { title: "JEE Main", value: "JEE Main" },
          { title: "JEE Advanced", value: "JEE Advanced" },
          { title: "NEET", value: "NEET" },
          { title: "WBJEE", value: "WBJEE" },
          { title: "WBCHSE (Class 12)", value: "WBCHSE" },
          { title: "WBBSE (Class 10)", value: "WBBSE" },
          { title: "CBSE Class 12", value: "CBSE 12" },
          { title: "CBSE Class 10", value: "CBSE 10" },
        ],
      },
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
    }),
    defineField({
      name: "rank",
      title: "Rank / Position",
      type: "string",
      placeholder: "e.g., AIR 247 / State Topper",
    }),
    defineField({
      name: "score",
      title: "Score / Percentage",
      type: "string",
      placeholder: "e.g., 98.6% / 720/720",
    }),
    defineField({
      name: "college",
      title: "College Admitted",
      type: "string",
      placeholder: "e.g., IIT Bombay - CSE",
    }),
    defineField({
      name: "testimonial",
      title: "Student Testimonial",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Topper",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
});
