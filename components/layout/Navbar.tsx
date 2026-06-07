"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, GraduationCap, Phone, Sparkles, BookOpen } from "lucide-react";
import { useScrollPosition } from "@/hooks/useScrollPosition";

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "Courses",
    href: "/courses",
    children: [
      { label: "Class 5-8 Foundation", href: "/courses#class-5-8" },
      { label: "Class 9-10 WBBSE Prep", href: "/courses#class-9-10" },
      { label: "Computer Science & Coding", href: "/courses#computer-science" },
    ],
  },
  { label: "Faculty", href: "/faculty" },
  { label: "Results", href: "/results" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const { isScrolled, scrollDirection } = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => { setMobileOpen(false); setActiveDropdown(null); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: scrollDirection === "down" && isScrolled ? -100 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-white border-b-2 border-black shadow-sm"
            : "py-5 bg-transparent"
        }`}
        id="navbar"
      >
        <div className="container-xl flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" id="nav-logo">
            <div className="w-10 h-10 rounded-xl bg-blue-600 border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:translate-y-[-1px] group-hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base font-extrabold font-display text-black tracking-tight uppercase">
                Study With Sutirtha
              </span>
              <span className="text-[9px] text-black/70 font-bold uppercase tracking-wider mt-0.5">Class 5 to 10 (Math & Science · WBBSE)</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) => (
              <div key={item.label} className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-extrabold border-2 transition-all ${
                    isActive(item.href)
                      ? "text-black bg-[#00F0FF] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      : "text-black border-transparent hover:border-black hover:bg-white"
                  }`}
                  id={`nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === item.label ? "rotate-180" : ""}`} />
                  )}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl p-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                      {item.children.map((child) => (
                        <Link key={child.label} href={child.href}
                          className="block px-3.5 py-2.5 text-xs font-bold text-black hover:text-black hover:bg-[#E6F5EC] border border-transparent hover:border-black rounded-xl transition-all duration-100"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Link href="/student/login"
              className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-extrabold border-2 border-black bg-white hover:bg-[#00F0FF] transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap"
              id="nav-student-portal"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Student Portal
            </Link>
            <a href="tel:+919064077914"
              className="hidden lg:flex items-center justify-center w-9 h-9 rounded-full border-2 border-black bg-white hover:bg-[#00F0FF] transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              id="nav-phone"
              title="Call us: +91 90640 77914"
            >
              <Phone className="w-4 h-4 text-black" />
            </a>
            <Link href="/enroll" className="hidden md:flex btn-primary text-sm py-2 px-5" id="nav-enroll-cta">
              <Sparkles className="w-3.5 h-3.5" />
              Enroll Now
            </Link>
            
            {/* Shardeum style Mobile Toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl border-2 border-black bg-[#D2FF00] text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
              aria-label="Toggle menu" id="mobile-menu-toggle"
            >
              {mobileOpen ? <X className="w-5 h-5 stroke-[2.5]" /> : <Menu className="w-5 h-5 stroke-[2.5]" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-[var(--bg-primary)] border-l-2 border-black shadow-2xl overflow-y-auto"
            >
              <div className="p-6 pt-24">
                <nav className="space-y-2">
                  {navItems.map((item, i) => (
                    <motion.div key={item.label}
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link href={item.href}
                        className={`block px-4 py-3 rounded-xl text-sm font-extrabold border-2 transition-all ${
                          isActive(item.href)
                            ? "text-black bg-[#00F0FF] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                            : "text-black border-transparent hover:border-black hover:bg-white"
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                      {item.children && (
                        <div className="ml-4 mt-1.5 space-y-1 pl-3 border-l-2 border-black">
                          {item.children.map((child) => (
                            <Link key={child.label} href={child.href}
                              className="block px-4 py-2 text-xs font-bold text-black/70 hover:text-black hover:bg-[#E6F5EC] border border-transparent hover:border-black rounded-lg transition-all"
                              onClick={() => setMobileOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </nav>
                <div className="mt-8 space-y-4">
                  <Link href="/enroll" className="btn-primary w-full justify-center text-center py-3.5" onClick={() => setMobileOpen(false)} id="mobile-enroll-cta">
                    <Sparkles className="w-4 h-4" /> Enroll Now
                  </Link>
                  <Link href="/student/login" className="btn-secondary w-full justify-center text-center py-3.5" onClick={() => setMobileOpen(false)} id="mobile-student-portal-cta">
                    <BookOpen className="w-4 h-4" /> Student Portal
                  </Link>
                  <a href="tel:+919064077914" className="btn-secondary w-full justify-center text-center py-3.5" id="mobile-call-cta">
                    <Phone className="w-4 h-4" /> Call Us
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
