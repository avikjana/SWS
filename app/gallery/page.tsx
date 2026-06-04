"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, Filter } from "lucide-react";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/animations/ScrollReveal";
import { BackToTop } from "@/components/ui/BackToTop";

const categories = ["All", "Campus", "Events", "Seminars", "Workshops", "Celebrations"];

// Using gradient placeholders as images
const galleryItems = [
  { id: 1, title: "Main Campus Building", category: "Campus", gradient: "from-blue-600 to-indigo-700", emoji: "🏛️", span: "col-span-2" },
  { id: 2, title: "Physics Lab", category: "Campus", gradient: "from-cyan-600 to-blue-600", emoji: "🔬" },
  { id: 3, title: "Computer Lab", category: "Campus", gradient: "from-purple-600 to-violet-700", emoji: "💻" },
  { id: 4, title: "JEE Success Seminar 2024", category: "Seminars", gradient: "from-green-600 to-emerald-700", emoji: "🎓", span: "row-span-2" },
  { id: 5, title: "Science Exhibition", category: "Events", gradient: "from-orange-600 to-amber-600", emoji: "⚗️" },
  { id: 6, title: "Annual Prize Distribution", category: "Celebrations", gradient: "from-rose-600 to-pink-600", emoji: "🏆", span: "col-span-2" },
  { id: 7, title: "Math Workshop", category: "Workshops", gradient: "from-indigo-600 to-blue-700", emoji: "📐" },
  { id: 8, title: "NEET Prep Session", category: "Seminars", gradient: "from-teal-600 to-cyan-600", emoji: "🏥" },
  { id: 9, title: "Library Reading Room", category: "Campus", gradient: "from-amber-600 to-yellow-600", emoji: "📚", span: "col-span-2" },
  { id: 10, title: "Student Cultural Event", category: "Events", gradient: "from-pink-600 to-rose-600", emoji: "🎉" },
  { id: 11, title: "Sports Day 2024", category: "Events", gradient: "from-sky-600 to-blue-600", emoji: "🏅" },
  { id: 12, title: "Chemistry Workshop", category: "Workshops", gradient: "from-violet-600 to-purple-700", emoji: "🧪", span: "row-span-2" },
  { id: 13, title: "Teachers Day Celebration", category: "Celebrations", gradient: "from-emerald-600 to-green-700", emoji: "👩‍🏫" },
  { id: 14, title: "Classroom in Action", category: "Campus", gradient: "from-blue-500 to-sky-600", emoji: "📖" },
  { id: 15, title: "Result Celebration 2024", category: "Celebrations", gradient: "from-yellow-500 to-orange-600", emoji: "🎊", span: "col-span-2" },
  { id: 16, title: "Study Hall", category: "Campus", gradient: "from-slate-600 to-gray-700", emoji: "✏️" },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);

  const filtered = selectedCategory === "All" ? galleryItems : galleryItems.filter(i => i.category === selectedCategory);

  return (
    <>
      <main className="pt-20">
        {/* Hero */}
        <section className="section-padding-sm bg-[var(--bg-primary)] relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="container-xl relative text-center">
            <ScrollReveal>
              <div className="section-tag mx-auto">
                <Camera className="w-3.5 h-3.5" />
                Gallery
              </div>
              <h1 className="text-5xl md:text-6xl font-bold font-display text-[var(--text-primary)] mt-4">
                Life at{" "}
                <span className="text-gradient">Xaurum Academy</span>
              </h1>
              <p className="mt-4 text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
                Glimpses of our vibrant campus, inspiring events, and the memorable moments that define our academy.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Gallery */}
        <section className="section-padding bg-[var(--bg-secondary)]">
          <div className="container-xl">
            {/* Filter */}
            <ScrollReveal className="flex items-center gap-3 flex-wrap mb-10">
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Filter className="w-4 h-4" />
                Category:
              </div>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
                    selectedCategory === cat
                      ? "bg-blue-500/20 text-blue-400 border-blue-500/40"
                      : "glass border-[var(--border)] text-[var(--text-secondary)] hover:text-blue-400 hover:border-blue-500/30"
                  }`}
                  id={`gallery-filter-${cat.toLowerCase()}`}
                >
                  {cat}
                </button>
              ))}
            </ScrollReveal>

            {/* Masonry-style Grid */}
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              <AnimatePresence>
                {filtered.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className={`${item.span || ""} cursor-pointer group rounded-2xl overflow-hidden border border-[var(--border)] hover:border-blue-500/30 transition-all duration-300`}
                    onClick={() => setSelectedImage(item)}
                  >
                    <div className={`w-full h-48 bg-gradient-to-br ${item.gradient} flex flex-col items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      <span className="text-5xl mb-3 relative z-10 group-hover:scale-110 transition-transform duration-300">{item.emoji}</span>
                      <p className="relative z-10 text-white font-medium text-sm text-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.title}</p>
                    </div>
                    <div className="p-3 bg-[var(--bg-tertiary)]">
                      <p className="text-sm font-medium text-[var(--text-primary)] truncate">{item.title}</p>
                      <span className="text-xs text-[var(--text-muted)]">{item.category}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-2xl w-full z-10"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
                id="gallery-close-lightbox"
              >
                <X className="w-6 h-6" />
              </button>
              <div className={`w-full h-80 rounded-2xl bg-gradient-to-br ${selectedImage.gradient} flex items-center justify-center`}>
                <span className="text-8xl">{selectedImage.emoji}</span>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold font-display text-white">{selectedImage.title}</h3>
                <span className="badge badge-blue mt-2">{selectedImage.category}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <BackToTop />
    </>
  );
}
