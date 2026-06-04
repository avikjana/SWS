"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useScrollPosition } from "@/hooks/useScrollPosition";

export function BackToTop() {
  const { scrollY } = useScrollPosition();
  const show = scrollY > 400;

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-sky text-white shadow-glow hover:shadow-glow hover:scale-110 transition-all duration-300"
          aria-label="Back to top"
          id="back-to-top-btn"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
