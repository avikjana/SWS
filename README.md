# Xaurum Academy Website

A premium, modern, enterprise-grade coaching center website built with Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, and Sanity CMS.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.x
- **Animations**: Framer Motion 11
- **CMS**: Sanity v3
- **Fonts**: Inter, Outfit, JetBrains Mono (Google Fonts)
- **Deployment**: Vercel-ready

## 📦 Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Fill in your env vars in .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🏗️ Project Structure

```
app/                    # Next.js App Router
  ├── page.tsx          # Home page
  ├── about/            # About Us
  ├── courses/          # All courses
  ├── faculty/          # Faculty team
  ├── results/          # Results & toppers
  ├── gallery/          # Image gallery
  ├── blog/             # Blog listing
  ├── contact/          # Contact form
  └── api/              # API routes
      ├── contact/      # Contact form handler
      ├── inquiry/      # Course inquiry handler
      └── newsletter/   # Newsletter subscription
components/
  ├── animations/       # Framer Motion components
  ├── layout/           # Navbar, Footer, ThemeProvider
  ├── sections/         # Page sections
  └── ui/               # Reusable UI components
features/               # Feature components (modals, counters, particles)
hooks/                  # Custom React hooks
lib/                    # Utility functions
sanity/                 # Sanity CMS
  ├── lib/              # Client & queries
  └── schemaTypes/      # CMS schemas
types/                  # TypeScript definitions
public/                 # Static assets
```

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | `#2563EB` | Main CTA, links, badges |
| Sky Blue | `#0EA5E9` | Gradient endpoints |
| Purple | `#8B5CF6` | Accents, gradients |
| Indigo | `#6366F1` | Secondary accents |

## 📱 Pages

1. **Home** — Hero, Why Choose Us, Stats, Courses, Top Rankers, Faculty, Testimonials, FAQ
2. **About** — Story, Mission/Vision, Timeline, Infrastructure, Location
3. **Courses** — Class 9-10, 11-12 Sci, 11-12 Com, JEE, NEET, WBJEE, CS
4. **Faculty** — 8 detailed faculty profiles
5. **Results** — Filterable toppers grid with animated counters
6. **Gallery** — Masonry gallery with lightbox and category filters
7. **Blog** — Searchable posts with category filtering
8. **Contact** — Form, WhatsApp CTA, maps placeholder

## 🗃️ Sanity CMS Schemas

- `course` — Course listings
- `faculty` — Faculty profiles
- `result` — Student achievements
- `post` — Blog articles
- `testimonial` — Student testimonials
- `gallery` — Gallery images

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Add environment variables in Vercel dashboard:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN`
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

## ⚙️ Sanity Studio Setup

1. Create a Sanity project at [sanity.io](https://sanity.io)
2. Update `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local`
3. Deploy Sanity Studio: `npx sanity deploy`

## 📝 Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run type-check   # TypeScript check
npm run lint         # ESLint
```

## 📄 License

© 2024 Xaurum Academy. All rights reserved.
