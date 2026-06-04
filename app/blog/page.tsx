"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Search, Clock, ArrowRight, Tag, Star } from "lucide-react";
import Link from "next/link";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/animations/ScrollReveal";
import { BackToTop } from "@/components/ui/BackToTop";

const categories = ["All", "Study Tips", "JEE Guide", "NEET Guide", "Board Exams", "Career Guidance", "Success Stories"];

const posts = [
  {
    id: "1",
    title: "How to Score 95+ in JEE Main 2025: Complete Strategy",
    excerpt: "A comprehensive month-by-month preparation strategy for JEE Main 2025, covering all three subjects with topic priorities and mock test scheduling.",
    category: "JEE Guide",
    readTime: 12,
    publishedAt: "2024-12-15",
    isFeatured: true,
    tags: ["JEE", "Strategy", "Physics", "Chemistry", "Math"],
    gradient: "from-blue-600/20 to-indigo-600/10",
    emoji: "🎯",
    author: "Dr. Rajesh Kumar",
  },
  {
    id: "2",
    title: "NEET 2025 Biology: High-Yield Topics You Must Cover",
    excerpt: "Identify the most important biology chapters for NEET 2025 based on weightage analysis of the last 10 years of NEET papers.",
    category: "NEET Guide",
    readTime: 8,
    publishedAt: "2024-12-10",
    isFeatured: true,
    tags: ["NEET", "Biology", "Botany", "Zoology"],
    gradient: "from-green-600/20 to-emerald-600/10",
    emoji: "🏥",
    author: "Dr. Priya Das",
  },
  {
    id: "3",
    title: "From 60% to 98%: Sneha's Incredible WBCHSE Journey",
    excerpt: "How Class 11 student Sneha Paul transformed her study habits and went from average to topper in just 18 months at Xaurum Academy.",
    category: "Success Stories",
    readTime: 6,
    publishedAt: "2024-12-05",
    isFeatured: true,
    tags: ["Success", "WBCHSE", "Motivation"],
    gradient: "from-purple-600/20 to-violet-600/10",
    emoji: "⭐",
    author: "Xaurum Academy",
  },
  {
    id: "4",
    title: "10 Effective Study Techniques Backed by Neuroscience",
    excerpt: "Discover scientifically proven study methods including spaced repetition, interleaving, and retrieval practice to maximize retention.",
    category: "Study Tips",
    readTime: 9,
    publishedAt: "2024-11-28",
    isFeatured: false,
    tags: ["Study Tips", "Productivity", "Memory"],
    gradient: "from-orange-600/20 to-amber-600/10",
    emoji: "🧠",
    author: "Prof. Sunita Sharma",
  },
  {
    id: "5",
    title: "WBJEE 2025: Complete Syllabus & Paper Analysis",
    excerpt: "Detailed analysis of WBJEE 2024 paper with topic-wise questions distribution and prediction for WBJEE 2025 exam pattern.",
    category: "NEET Guide",
    readTime: 10,
    publishedAt: "2024-11-20",
    isFeatured: false,
    tags: ["WBJEE", "Syllabus", "West Bengal"],
    gradient: "from-indigo-600/20 to-blue-600/10",
    emoji: "🏆",
    author: "Mr. Debashis Sen",
  },
  {
    id: "6",
    title: "Engineering vs Medicine: How to Choose the Right Career Path",
    excerpt: "A practical guide to help students and parents make the critical choice between JEE engineering and NEET medical career paths.",
    category: "Career Guidance",
    readTime: 7,
    publishedAt: "2024-11-15",
    isFeatured: false,
    tags: ["Career", "Engineering", "Medicine", "Guidance"],
    gradient: "from-rose-600/20 to-pink-600/10",
    emoji: "🗺️",
    author: "Dr. Rajesh Kumar",
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered = posts.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featured = posts.filter((p) => p.isFeatured);

  return (
    <>
      <main className="pt-20">
        {/* Hero */}
        <section className="section-padding-sm bg-[var(--bg-primary)] relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="container-xl relative text-center">
            <ScrollReveal>
              <div className="section-tag mx-auto">
                <BookOpen className="w-3.5 h-3.5" />
                Blog & Resources
              </div>
              <h1 className="text-5xl md:text-6xl font-bold font-display text-[var(--text-primary)] mt-4">
                Knowledge &{" "}
                <span className="text-gradient">Inspiration</span>
              </h1>
              <p className="mt-4 text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
                Expert tips, exam guides, success stories, and career advice from the Xaurum Academy faculty team.
              </p>
            </ScrollReveal>

            {/* Search */}
            <ScrollReveal delay={0.1} className="max-w-xl mx-auto mt-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl glass border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-blue-500/50"
                  id="blog-search"
                />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Featured Posts */}
        {!search && selectedCategory === "All" && (
          <section className="section-padding-sm bg-[var(--bg-secondary)]">
            <div className="container-xl">
              <ScrollReveal className="mb-8">
                <h2 className="text-2xl font-bold font-display text-[var(--text-primary)] flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  Featured Posts
                </h2>
              </ScrollReveal>
              <div className="grid md:grid-cols-3 gap-5">
                {featured.map((post, i) => (
                  <ScrollReveal key={post.id} delay={i * 0.1} className="card-premium border border-[var(--border)] hover:border-blue-500/30 overflow-hidden group cursor-pointer">
                    <div className={`h-40 bg-gradient-to-br ${post.gradient} flex items-center justify-center`}>
                      <span className="text-6xl">{post.emoji}</span>
                    </div>
                    <div className="p-5">
                      <span className="badge badge-blue text-xs mb-2">{post.category}</span>
                      <h3 className="font-bold font-display text-[var(--text-primary)] mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">{post.title}</h3>
                      <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readTime} min read
                        </div>
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Posts */}
        <section className="section-padding bg-[var(--bg-primary)]">
          <div className="container-xl">
            {/* Categories */}
            <ScrollReveal className="flex gap-2 flex-wrap mb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                    selectedCategory === cat
                      ? "bg-blue-500/20 text-blue-400 border-blue-500/40"
                      : "glass border-[var(--border)] text-[var(--text-secondary)] hover:border-blue-500/30"
                  }`}
                  id={`blog-cat-${cat.replace(/\s/g, "-").toLowerCase()}`}
                >
                  {cat}
                </button>
              ))}
            </ScrollReveal>

            {filtered.length === 0 ? (
              <div className="text-center py-20 text-[var(--text-muted)]">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-40" />
                <p>No articles found. Try a different search term.</p>
              </div>
            ) : (
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.07}>
                {filtered.map((post) => (
                  <motion.div
                    key={post.id}
                    variants={staggerItem}
                    className="card-premium border border-[var(--border)] hover:border-blue-500/30 overflow-hidden group cursor-pointer flex flex-col"
                  >
                    <div className={`h-36 bg-gradient-to-br ${post.gradient} flex items-center justify-center`}>
                      <span className="text-5xl">{post.emoji}</span>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="badge badge-blue text-xs">{post.category}</span>
                        {post.isFeatured && <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />}
                      </div>
                      <h3 className="font-bold font-display text-[var(--text-primary)] mb-2 group-hover:text-blue-400 transition-colors">{post.title}</h3>
                      <p className="text-sm text-[var(--text-secondary)] mb-3 line-clamp-2 flex-grow">{post.excerpt}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="flex items-center gap-1 text-xs text-[var(--text-muted)] bg-white/5 rounded-md px-2 py-0.5">
                            <Tag className="w-2.5 h-2.5" />{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs flex items-center justify-center font-bold">
                            {post.author[0]}
                          </div>
                          <span className="text-xs text-[var(--text-muted)]">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                          <Clock className="w-3 h-3" />
                          {post.readTime} min
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </StaggerContainer>
            )}
          </div>
        </section>
      </main>
      <BackToTop />
    </>
  );
}
