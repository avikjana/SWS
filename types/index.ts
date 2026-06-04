// Central TypeScript type definitions for Xaurum Academy

// ===== Sanity Base =====
export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface SanitySlug {
  _type: "slug";
  current: string;
}

// ===== Course =====
export type CourseCategory =
  | "class-9-10"
  | "class-11-12-science"
  | "class-11-12-commerce"
  | "jee"
  | "neet"
  | "wbjee"
  | "cs";

export interface Course {
  _id: string;
  title: string;
  slug: SanitySlug;
  category: CourseCategory;
  description: string;
  longDescription?: unknown[];
  duration: string;
  fees?: number;
  feesDisplay: string;
  features: string[];
  subjects: string[];
  batchSize?: number;
  image?: SanityImage;
  icon?: string;
  badge?: string;
  isPopular: boolean;
  order: number;
}

// ===== Faculty =====
export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  email?: string;
}

export interface Faculty {
  _id: string;
  name: string;
  slug?: SanitySlug;
  designation: string;
  qualification: string;
  experience: number;
  experienceText: string;
  subjects: string[];
  photo?: SanityImage;
  bio?: string;
  achievements?: string[];
  socialLinks?: SocialLinks;
  isHeadFaculty: boolean;
  order: number;
}

// ===== Result =====
export type ExamType =
  | "JEE Main"
  | "JEE Advanced"
  | "NEET"
  | "WBJEE"
  | "WBCHSE"
  | "WBBSE"
  | "CBSE 12"
  | "CBSE 10";

export interface Result {
  _id: string;
  studentName: string;
  photo?: SanityImage;
  exam: ExamType;
  year: number;
  rank?: string;
  score?: string;
  college?: string;
  testimonial?: string;
  isFeatured: boolean;
  order: number;
}

// ===== Blog Post =====
export type PostCategory =
  | "study-tips"
  | "jee-guide"
  | "neet-guide"
  | "wbjee-guide"
  | "board-exams"
  | "career-guidance"
  | "news"
  | "success-stories";

export interface PostAuthor {
  name: string;
  designation: string;
  photo?: SanityImage;
}

export interface Post {
  _id: string;
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  coverImage?: SanityImage;
  category: PostCategory;
  content?: unknown[];
  author?: PostAuthor;
  tags?: string[];
  isFeatured: boolean;
  readTime?: number;
  publishedAt: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

// ===== Testimonial =====
export interface Testimonial {
  _id: string;
  studentName: string;
  photo?: SanityImage;
  exam?: string;
  year?: number;
  achievement?: string;
  content: string;
  rating: number;
  isFeatured: boolean;
  order: number;
}

// ===== Gallery =====
export type GalleryCategory =
  | "campus"
  | "events"
  | "seminars"
  | "workshops"
  | "celebrations"
  | "infrastructure";

export interface GalleryItem {
  _id: string;
  title: string;
  image: SanityImage;
  alt?: string;
  category: GalleryCategory;
  description?: string;
  date?: string;
  order: number;
}

// ===== Contact Form =====
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  courseInterest?: string;
}

// ===== Course Inquiry =====
export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  courseId: string;
  courseName: string;
  message?: string;
  preferredBatch?: string;
}

// ===== Newsletter =====
export interface NewsletterFormData {
  email: string;
  name?: string;
}

// ===== Navigation =====
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// ===== Stats =====
export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon?: string;
}

// ===== FAQ =====
export interface FAQItem {
  question: string;
  answer: string;
}

// ===== Batch =====
export interface Batch {
  id: string;
  courseName: string;
  startDate: string;
  time: string;
  seats: number;
  availableSeats: number;
  mode: "offline" | "online" | "hybrid";
  instructor: string;
}
