// Sanity GROQ Queries
import { groq } from "next-sanity";

export const COURSES_QUERY = groq`
  *[_type == "course"] | order(order asc) {
    _id,
    title,
    slug,
    category,
    description,
    duration,
    fees,
    feesDisplay,
    features,
    subjects,
    batchSize,
    image,
    icon,
    badge,
    isPopular,
    order
  }
`;

export const FACULTY_QUERY = groq`
  *[_type == "faculty"] | order(order asc) {
    _id,
    name,
    slug,
    designation,
    qualification,
    experience,
    experienceText,
    subjects,
    photo,
    bio,
    achievements,
    socialLinks,
    isHeadFaculty,
    order
  }
`;

export const RESULTS_QUERY = groq`
  *[_type == "result"] | order(order asc) {
    _id,
    studentName,
    photo,
    exam,
    year,
    rank,
    score,
    college,
    testimonial,
    isFeatured,
    order
  }
`;

export const FEATURED_RESULTS_QUERY = groq`
  *[_type == "result" && isFeatured == true] | order(order asc) [0...8] {
    _id,
    studentName,
    photo,
    exam,
    year,
    rank,
    score,
    college
  }
`;

export const POSTS_QUERY = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    category,
    tags,
    isFeatured,
    readTime,
    publishedAt,
    author-> {
      name,
      designation,
      photo
    }
  }
`;

export const FEATURED_POSTS_QUERY = groq`
  *[_type == "post" && isFeatured == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    category,
    readTime,
    publishedAt
  }
`;

export const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial"] | order(order asc) {
    _id,
    studentName,
    photo,
    exam,
    year,
    achievement,
    content,
    rating,
    isFeatured,
    order
  }
`;

export const GALLERY_QUERY = groq`
  *[_type == "gallery"] | order(order asc) {
    _id,
    title,
    image,
    alt,
    category,
    description,
    date
  }
`;
