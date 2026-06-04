"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Award, Star, TrendingUp, Filter } from "lucide-react";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/animations/ScrollReveal";
import { AnimatedCounter } from "@/features/Counter";
import { BackToTop } from "@/components/ui/BackToTop";

const exams = ["All", "JEE Main", "JEE Advanced", "NEET", "WBJEE", "WBCHSE", "WBBSE"];

const results = [
  { name: "Aryan Sharma", exam: "JEE Advanced", rank: "AIR 247", score: "98.5 percentile", year: 2024, college: "IIT Bombay – CSE", avatarBg: "from-blue-600 to-indigo-600", featured: true },
  { name: "Priya Singh", exam: "NEET", rank: "AIR 312", score: "720/720", year: 2024, college: "AIIMS Delhi", avatarBg: "from-green-600 to-emerald-600", featured: true },
  { name: "Rohit Das", exam: "WBJEE", rank: "State Rank 18", score: "99.2 percentile", year: 2024, college: "Jadavpur University – EE", avatarBg: "from-purple-600 to-violet-600", featured: true },
  { name: "Sneha Paul", exam: "WBCHSE", rank: "School Topper", score: "98.6%", year: 2024, college: "Science Stream", avatarBg: "from-rose-600 to-pink-600", featured: false },
  { name: "Aditya Roy", exam: "JEE Main", rank: "AIR 890", score: "99.1 percentile", year: 2024, college: "NIT Durgapur – CSE", avatarBg: "from-sky-600 to-cyan-600", featured: false },
  { name: "Tanvi Ghosh", exam: "NEET", rank: "State Rank 45", score: "710/720", year: 2024, college: "IPGMER Kolkata", avatarBg: "from-rose-500 to-pink-600", featured: false },
  { name: "Karan Mehta", exam: "JEE Advanced", rank: "AIR 512", score: "97.8 percentile", year: 2024, college: "IIT Kanpur – EE", avatarBg: "from-amber-600 to-orange-600", featured: false },
  { name: "Riya Bose", exam: "WBBSE", rank: "District Rank 2", score: "97%", year: 2024, college: "Class 10 Board", avatarBg: "from-teal-600 to-cyan-600", featured: false },
  { name: "Sayan Dey", exam: "JEE Main", rank: "AIR 1240", score: "98.7 percentile", year: 2023, college: "NIT Silchar – ME", avatarBg: "from-indigo-600 to-blue-600", featured: false },
  { name: "Meghna Pal", exam: "NEET", rank: "AIR 680", score: "698/720", year: 2023, college: "Medical College Kolkata", avatarBg: "from-pink-600 to-rose-600", featured: false },
  { name: "Subham Mondal", exam: "WBJEE", rank: "State Rank 56", score: "98.5 percentile", year: 2023, college: "BESU Shibpur – CSE", avatarBg: "from-violet-600 to-purple-600", featured: false },
  { name: "Arpita Roy", exam: "WBCHSE", rank: "District Topper", score: "99.2%", year: 2023, college: "Science Topper", avatarBg: "from-emerald-600 to-green-600", featured: false },
];

const stats = [
  { end: 500, suffix: "+", label: "Total Toppers", description: "JEE, NEET, WBJEE & Board" },
  { end: 98, suffix: "%", label: "Success Rate", description: "Students clearing their target exam" },
  { end: 200, suffix: "+", label: "IIT Selections", description: "In the last 10 years" },
  { end: 15, suffix: "+", label: "Years of Results", description: "Consistent track record since 2009" },
];

export default function ResultsPage() {
  const [selectedExam, setSelectedExam] = useState("All");

  const filtered = selectedExam === "All" ? results : results.filter(r => r.exam === selectedExam);

  return (
    <>
      <main className="pt-20">
        {/* Hero */}
        <section className="section-padding-sm bg-[var(--bg-primary)] relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="container-xl relative text-center">
            <ScrollReveal>
              <div className="section-tag mx-auto">
                <Trophy className="w-3.5 h-3.5" />
                Hall of Fame
              </div>
              <h1 className="text-5xl md:text-6xl font-bold font-display text-[var(--text-primary)] mt-4">
                Our Students'{" "}
                <span className="text-gradient">Achievements</span>
              </h1>
              <p className="mt-4 text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
                Every rank here is a story of perseverance, dedication, and the partnership between student and teacher.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Stats */}
        <section className="section-padding-sm bg-[var(--bg-secondary)]">
          <div className="container-xl grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1} className="card-premium p-6 text-center border border-[var(--border)] hover:border-blue-500/30">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} label={stat.label} />
                <p className="text-xs text-[var(--text-muted)] mt-1">{stat.description}</p>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Results */}
        <section className="section-padding bg-[var(--bg-primary)]">
          <div className="container-xl">
            {/* Filter */}
            <ScrollReveal className="flex items-center gap-3 flex-wrap mb-10">
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Filter className="w-4 h-4" />
                Filter by exam:
              </div>
              {exams.map((exam) => (
                <button
                  key={exam}
                  onClick={() => setSelectedExam(exam)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
                    selectedExam === exam
                      ? "bg-blue-500/20 text-blue-400 border-blue-500/40"
                      : "glass border-[var(--border)] text-[var(--text-secondary)] hover:text-blue-400 hover:border-blue-500/30"
                  }`}
                  id={`filter-${exam.replace(/\s/g, "-").toLowerCase()}`}
                >
                  {exam}
                </button>
              ))}
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" staggerDelay={0.06}>
              {filtered.map((result) => (
                <motion.div
                  key={`${result.name}-${result.year}`}
                  variants={staggerItem}
                  className="card-premium p-6 border border-[var(--border)] hover:border-yellow-500/30 group relative overflow-hidden"
                >
                  {result.featured && (
                    <div className="absolute top-3 right-3">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    </div>
                  )}

                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${result.avatarBg} flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {result.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>

                  <h3 className="font-bold font-display text-[var(--text-primary)] text-center mb-1">{result.name}</h3>
                  <p className="text-xs text-center text-[var(--text-muted)] mb-4">{result.year}</p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-yellow-500/8 border border-yellow-500/15">
                      <div className="flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-yellow-400" />
                        <span className="text-xs text-yellow-300 font-medium">Rank</span>
                      </div>
                      <span className="text-xs font-bold text-[var(--text-primary)]">{result.rank}</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-blue-500/8 border border-blue-500/15">
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                        <span className="text-xs text-blue-300 font-medium">Score</span>
                      </div>
                      <span className="text-xs font-bold text-[var(--text-primary)]">{result.score}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-[var(--border)]">
                    <span className="badge badge-blue text-xs block text-center py-1">{result.exam}</span>
                    <p className="text-xs text-center text-[var(--text-muted)] mt-2">{result.college}</p>
                  </div>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>
        </section>
      </main>
      <BackToTop />
    </>
  );
}
