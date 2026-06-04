// Sanity CMS Blog Post Schema
import { defineField, defineType } from "sanity";

export const postSchema = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
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
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Study Tips", value: "study-tips" },
          { title: "JEE Guide", value: "jee-guide" },
          { title: "NEET Guide", value: "neet-guide" },
          { title: "WBJEE Guide", value: "wbjee-guide" },
          { title: "Board Exams", value: "board-exams" },
          { title: "Career Guidance", value: "career-guidance" },
          { title: "News & Updates", value: "news" },
          { title: "Success Stories", value: "success-stories" },
        ],
      },
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt Text" }],
        },
      ],
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "faculty" }],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Post",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "readTime",
      title: "Read Time (minutes)",
      type: "number",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        { name: "metaTitle", type: "string", title: "Meta Title" },
        { name: "metaDescription", type: "text", title: "Meta Description", rows: 2 },
        { name: "keywords", type: "array", title: "Keywords", of: [{ type: "string" }] },
      ],
    }),
  ],
  orderings: [
    {
      title: "Published Date (Newest First)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
