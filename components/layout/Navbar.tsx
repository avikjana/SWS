"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, GraduationCap, Phone, Sparkles } from "lucide-react";
import { useScrollPosition } from "@/hooks/useScrollPosition";

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "Courses",
    href: "/courses",
    children: [
      { label: "Class 9-10 Foundation", href: "/courses#class-9-10" },
      { label: "Class 11-12 Science", href: "/courses#class-11-12-science" },
      { label: "Class 11-12 Commerce", href: "/courses#class-11-12-commerce" },
      { label: "JEE Preparation", href: "/courses#jee" },
      { label: "NEET Preparation", href: "/courses#neet" },
      { label: "WBJEE Preparation", href: "/courses#wbjee" },
      { label: "Computer Science", href: "/courses#cs" },
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
            ? "py-3 bg-white/90 backdrop-blur-xl border-b border-[var(--border)] shadow-sm"
            : "py-5 bg-transparent"
        }`}
        id="navbar"
      >
        <div className="container-xl flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" id="nav-logo">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#0EA5E9] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <GraduationCap className="w-4.5 h-4.5 text-white w-5 h-5" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base font-bold font-display text-[#0B0E17] tracking-tight">
                Xaurum <span className="text-[#2563EB]">Academy</span>
              </span>
              <span className="text-[10px] text-[var(--text-muted)] font-medium tracking-wide">JEE · NEET · WBJEE · Boards</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
            {navItems.map((item) => (
              <div key={item.label} className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive(item.href)
                      ? "text-[#2563EB] bg-blue-50"
                      : "text-[#374151] hover:text-[#0B0E17] hover:bg-gray-100"
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
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl p-2 shadow-lg border border-[var(--border)]"
                    >
                      {item.children.map((child) => (
                        <Link key={child.label} href={child.href}
                          className="block px-3.5 py-2.5 text-sm text-[var(--text-secondary)] hover:text-[#2563EB] hover:bg-blue-50 rounded-xl transition-all duration-100 font-medium"
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
            <a href="tel:+919800000000"
              className="hidden lg:flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[#2563EB] transition-colors"
              id="nav-phone"
            >
              <Phone className="w-3.5 h-3.5" />
              +91 98000 00000
            </a>
            <Link href="/courses" className="hidden md:flex btn-primary text-sm py-2.5 px-5" id="nav-enroll-cta">
              <Sparkles className="w-3.5 h-3.5" />
              Enroll Now
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-[var(--border)] bg-white text-[var(--text-secondary)] hover:border-[#2563EB] transition-colors"
              aria-label="Toggle menu" id="mobile-menu-toggle"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
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
            <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl overflow-y-auto border-l border-[var(--border)]"
            >
              <div className="p-6 pt-20">
                <nav className="space-y-1">
                  {navItems.map((item, i) => (
                    <motion.div key={item.label}
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link href={item.href}
                        className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                          isActive(item.href) ? "text-[#2563EB] bg-blue-50" : "text-[var(--text-primary)] hover:bg-gray-50"
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                      {item.children && (
                        <div className="ml-4 mt-0.5 space-y-0.5">
                          {item.children.map((child) => (
                            <Link key={child.label} href={child.href}
                              className="block px-4 py-2 text-xs text-[var(--text-muted)] hover:text-[#2563EB] hover:bg-blue-50/60 rounded-lg transition-all font-medium"
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
                <div className="mt-6 space-y-3">
                  <Link href="/courses" className="btn-primary w-full justify-center" onClick={() => setMobileOpen(false)} id="mobile-enroll-cta">
                    <Sparkles className="w-4 h-4" /> Enroll Now
                  </Link>
                  <a href="tel:+919800000000" className="btn-secondary w-full justify-center" id="mobile-call-cta">
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
