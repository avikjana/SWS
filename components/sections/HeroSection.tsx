"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Star, Users, Award, BookOpen, CheckCircle } from "lucide-react";

const trustPoints = [
  "Mentor: SUTIRTHA BASUMALLICK",
  "Math & Science Sections Only (WBBSE)",
  "Online & Offline + Home Tuition",
];

export function HeroSection() {

  return (
    <>
      <section
        id="hero"
        className="relative min-h-screen flex items-center overflow-hidden bg-[var(--bg-primary)] border-b-2 border-black"
        aria-label="Hero Section"
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-grid opacity-30" />

        <div className="container-xl relative z-10 pt-28 pb-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Announcement pill */}
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-black text-xs font-bold uppercase tracking-wider text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                Admissions Open – Session 2026-27
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-5xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-black leading-[1.05] mb-6"
              >
                Where Dreams
                <br />
                <span className="bg-[#00F0FF] px-3 py-1 border-2 border-black inline-block transform -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  Meet Success
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-lg md:text-xl text-[var(--text-secondary)] font-medium leading-relaxed mb-10 max-w-xl"
              >
                Welcome to <strong className="text-black font-extrabold">Study With Sutirtha Coaching Center</strong>. Premier guidance for <strong className="text-black font-extrabold">Class 5 to Class 10 WBBSE</strong> students, specializing in Mathematics &amp; Science sections. Online &amp; Offline classes available.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10 w-full sm:w-auto"
              >
                <Link
                  href="/enroll"
                  className="btn-primary text-base px-8 py-4 flex items-center justify-center gap-2"
                  id="hero-enroll-btn"
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/contact"
                  className="btn-secondary text-base px-8 py-4 flex items-center justify-center gap-2"
                  id="hero-demo-btn"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Contact Us Now
                </Link>
              </motion.div>

              {/* Trust Points */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 sm:gap-6 text-sm text-[var(--text-muted)]"
              >
                {trustPoints.map((tp) => (
                  <div key={tp} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="font-semibold text-black">{tp}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Graphic Column */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              {/* Backdrops elements */}
              <div className="absolute w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-3xl -z-10" />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full relative"
              >
                {/* Custom Neo-Brutalist SVG Graphics */}
                <svg viewBox="0 0 500 500" className="w-full h-auto max-w-[450px] mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
                  {/* Decorative background grid pattern patch */}
                  <defs>
                    <pattern id="brutalist-dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="2" fill="#000000" opacity="0.15" />
                    </pattern>
                  </defs>
                  
                  {/* Grid background behind items */}
                  <rect x="50" y="80" width="400" height="340" fill="url(#brutalist-dots)" rx="20" />
                  
                  {/* Neon Cyan Cylinder */}
                  <g transform="translate(340, 60) rotate(-15)">
                    {/* Shadow block */}
                    <path d="M0,40 L0,90 A40,15 0 0,0 80,90 L80,40 Z" fill="#000" />
                    <ellipse cx="40" cy="40" rx="40" ry="15" fill="#000" />
                    {/* Actual cylinder */}
                    <path d="M-4,36 L-4,86 A40,15 0 0,0 76,86 L76,36 Z" fill="#00F0FF" stroke="#000" strokeWidth="2.5" />
                    <ellipse cx="36" cy="36" rx="40" ry="15" fill="#00F0FF" stroke="#000" strokeWidth="2.5" />
                    {/* Hatch shadow lines */}
                    <line x1="2" y1="55" x2="2" y2="80" stroke="#000" strokeWidth="1.5" />
                    <line x1="14" y1="58" x2="14" y2="88" stroke="#000" strokeWidth="1.5" />
                    <line x1="26" y1="60" x2="26" y2="92" stroke="#000" strokeWidth="1.5" />
                  </g>

                  {/* Wireframe Globe with India highlighted in Pink */}
                  <g transform="translate(230, 270)">
                    {/* Solid Black Offset Shadow */}
                    <circle cx="6" cy="6" r="120" fill="#000000" />
                    {/* Main Globe body */}
                    <circle cx="0" cy="0" r="120" fill="#D2FF00" stroke="#000" strokeWidth="3" />
                    
                    {/* Longitude and Latitude grid lines */}
                    <path d="M-120,0 A120,50 0 0,0 120,0" fill="none" stroke="#000" strokeWidth="2" />
                    <path d="M-120,0 A120,90 0 0,0 120,0" fill="none" stroke="#000" strokeWidth="2" />
                    <path d="M-120,0 A120,90 0 0,1 120,0" fill="none" stroke="#000" strokeWidth="2" />
                    <path d="M0,-120 A50,120 0 0,0 0,120" fill="none" stroke="#000" strokeWidth="2" />
                    <path d="M0,-120 A90,120 0 0,0 0,120" fill="none" stroke="#000" strokeWidth="2" />
                    <path d="M0,-120 A90,120 0 0,1 0,120" fill="none" stroke="#000" strokeWidth="2" />

                    {/* India Map highlight shape in Magenta/Pink */}
                    <path d="M-10,-5 L-15,-25 L10,-35 L20,-20 L25,0 L10,15 L0,20 L-8,15 Z" fill="#FF007A" stroke="#000" strokeWidth="2.5" />
                    
                    {/* Hatching lines on the map */}
                    <line x1="-5" y1="-18" x2="5" y2="-8" stroke="#000" strokeWidth="2" />
                    <line x1="5" y1="-10" x2="15" y2="0" stroke="#000" strokeWidth="2" />
                    <line x1="-10" y1="-12" x2="0" y2="-2" stroke="#000" strokeWidth="2" />
                  </g>

                  {/* Isometric Pink Cube */}
                  <g transform="translate(40, 240) rotate(5)">
                    {/* Shadow face */}
                    <polygon points="0,0 50,-25 100,0 100,70 50,95 0,70" fill="#000" />
                    {/* Cube faces offset */}
                    <g transform="translate(-6, -6)">
                      {/* Top Face */}
                      <polygon points="0,0 50,-25 100,0 50,25" fill="#FF007A" stroke="#000" strokeWidth="3" />
                      {/* Left Face */}
                      <polygon points="0,0 50,25 50,95 0,70" fill="#E6006F" stroke="#000" strokeWidth="3" />
                      {/* Right Face */}
                      <polygon points="50,25 100,0 100,70 50,95" fill="#B30056" stroke="#000" strokeWidth="3" />
                      {/* Hatching on right face */}
                      <line x1="65" y1="40" x2="65" y2="75" stroke="#000" strokeWidth="1.5" />
                      <line x1="80" y1="30" x2="80" y2="65" stroke="#000" strokeWidth="1.5" />
                    </g>
                  </g>
                </svg>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
