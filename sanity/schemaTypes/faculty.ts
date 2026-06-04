// Sanity CMS Faculty Schema
import { defineField, defineType } from "sanity";

export const facultySchema = defineType({
  name: "faculty",
  title: "Faculty",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
    }),
    defineField({
      name: "designation",
      title: "Designation / Title",
      type: "string",
      placeholder: "e.g., Senior Faculty - Physics",
    }),
    defineField({
      name: "qualification",
      title: "Qualification",
      type: "string",
      placeholder: "e.g., M.Sc (Physics), IIT Delhi",
    }),
    defineField({
      name: "experience",
      title: "Experience (years)",
      type: "number",
    }),
    defineField({
      name: "experienceText",
      title: "Experience Display Text",
      type: "string",
      placeholder: "e.g., 12+ Years Teaching",
    }),
    defineField({
      name: "subjects",
      title: "Subjects Taught",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "photo",
      title: "Profile Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Short Bio",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "achievements",
      title: "Achievements",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        { name: "linkedin", type: "url", title: "LinkedIn" },
        { name: "twitter", type: "url", title: "Twitter" },
        { name: "email", type: "string", title: "Email" },
      ],
    }),
    defineField({
      name: "isHeadFaculty",
      title: "Is Head Faculty / Director",
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
