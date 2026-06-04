"use client";
import { motion } from "framer-motion";
import { Trophy, Award, TrendingUp, Star } from "lucide-react";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/animations/ScrollReveal";

const rankers = [
  { name:"Aryan Sharma",  exam:"JEE Advanced", rank:"AIR 247",        score:"98.5 percentile", college:"IIT Bombay – CSE",         year:2024, bg:"bg-blue-600",    initials:"AS" },
  { name:"Priya Singh",   exam:"NEET",         rank:"AIR 312",        score:"720/720",          college:"AIIMS Delhi",              year:2024, bg:"bg-emerald-600", initials:"PS" },
  { name:"Rohit Das",     exam:"WBJEE",        rank:"State Rank 18",  score:"99.2 percentile", college:"Jadavpur University – EE",  year:2024, bg:"bg-purple-600",  initials:"RD" },
  { name:"Sneha Paul",    exam:"WBCHSE",       rank:"School Topper",  score:"98.6%",            college:"Science Stream",           year:2024, bg:"bg-pink-600",    initials:"SP" },
  { name:"Aditya Roy",    exam:"JEE Main",     rank:"AIR 890",        score:"99.1 percentile", college:"NIT Durgapur – CSE",        year:2024, bg:"bg-sky-600",     initials:"AR" },
  { name:"Tanvi Ghosh",   exam:"NEET",         rank:"State Rank 45",  score:"710/720",          college:"IPGMER Kolkata",           year:2024, bg:"bg-rose-600",    initials:"TG" },
];

const examColors: Record<string, string> = {
  "JEE Advanced": "badge-blue",
  "NEET":         "badge-green",
  "WBJEE":        "badge-purple",
  "WBCHSE":       "badge-gray",
  "JEE Main":     "badge-blue",
};

export function TopRankers() {
  return (
    <section id="top-rankers" className="section-padding bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50" />

      <div className="container-xl relative">
        <ScrollReveal className="text-center mb-14">
          <div className="section-tag mx-auto">
            <Trophy className="w-3.5 h-3.5" />
            Hall of Fame
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-[#0B0E17] mt-4">
            Our Top Rankers{" "}
            <span className="text-gradient">2024</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
            Every rank is a testament to months of dedication and our faculty&apos;s unwavering support.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.1}>
          {rankers.map((r, i) => (
            <motion.div key={r.name} variants={staggerItem}
              className="card-premium p-6 border border-[var(--border-card)] hover:border-[#2563EB]/20 group"
            >
              {/* Top row */}
              <div className="flex items-start gap-4 mb-5">
                <div className={`w-14 h-14 rounded-2xl ${r.bg} flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300`}>
                  {r.initials}
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="font-bold font-display text-[#0B0E17]">{r.name}</h3>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className={`badge ${examColors[r.exam] || "badge-gray"} text-xs`}>{r.exam}</span>
                    <span className="text-xs text-[var(--text-muted)]">{r.year}</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-[#2563EB] opacity-20 group-hover:opacity-40 transition-opacity">#{i+1}</div>
              </div>

              {/* Rank & Score */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-100 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-xs text-amber-600 font-medium">Rank</span>
                  </div>
                  <p className="font-bold text-sm text-[#0B0E17]">{r.rank}</p>
                </div>
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-xs text-blue-600 font-medium">Score</span>
                  </div>
                  <p className="font-bold text-sm text-[#0B0E17]">{r.score}</p>
                </div>
              </div>

              {/* College */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#F8FAFB] border border-[var(--border)]">
                <Star className="w-4 h-4 text-[#2563EB] flex-shrink-0 fill-[#2563EB]" />
                <p className="text-sm text-[var(--text-secondary)] font-medium">{r.college}</p>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>

        <ScrollReveal delay={0.2} className="text-center mt-10">
          <a href="/results" className="btn-secondary px-8 py-3.5 inline-flex items-center gap-2" id="view-all-rankers-btn">
            View All Results <Trophy className="w-4 h-4" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
