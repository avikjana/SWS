// cn utility - combines class names without external dependencies
export function cn(...inputs: (string | undefined | null | boolean | (string | undefined | null | boolean)[])[]): string {
  return inputs
    .flat(Infinity)
    .filter((v) => typeof v === "string" && v.length > 0)
    .join(" ")
    .split(" ")
    .filter((v, i, arr) => arr.indexOf(v) === i)
    .join(" ");
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format date
export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}

// Truncate text
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

// Slugify string
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Generate placeholder avatar URL
export function avatarUrl(name: string, size = 120): string {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=${size}&background=2563eb&color=ffffff&bold=true`;
}

// Course category display names
export const courseCategoryMap: Record<string, string> = {
  "class-9-10": "Class 9-10",
  "class-11-12-science": "Class 11-12 Science",
  "class-11-12-commerce": "Class 11-12 Commerce",
  jee: "JEE Preparation",
  neet: "NEET Preparation",
  wbjee: "WBJEE Preparation",
  cs: "Computer Science",
};

// Exam badge colors
export const examBadgeColors: Record<string, string> = {
  "JEE Main": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "JEE Advanced": "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  NEET: "bg-green-500/20 text-green-400 border-green-500/30",
  WBJEE: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  WBCHSE: "bg-sky-500/20 text-sky-400 border-sky-500/30",
  WBBSE: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "CBSE 12": "bg-rose-500/20 text-rose-400 border-rose-500/30",
  "CBSE 10": "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

// Smooth scroll
export function scrollToElement(elementId: string): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
