import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#2563EB",
          600: "#1d4ed8",
          700: "#1e40af",
          800: "#1e3a8a",
          900: "#1e3a8a",
          DEFAULT: "#2563EB",
        },
        sky: {
          DEFAULT: "#0EA5E9",
        },
        secondary: {
          DEFAULT: "#8B5CF6",
          600: "#7c3aed",
        },
        indigo: {
          DEFAULT: "#6366F1",
        },
        surface: {
          light: "#ffffff",
          dark: "#0a0a0f",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "Outfit", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient":
          "linear-gradient(135deg, #0a0a0f 0%, #0d1117 50%, #0a0a1a 100%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(37,99,235,0.1) 0%, rgba(14,165,233,0.05) 100%)",
        "blue-purple":
          "linear-gradient(135deg, #2563EB 0%, #8B5CF6 100%)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out infinite 2s",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "counter-spin": "spin 1s linear infinite",
        "particle": "particle 15s linear infinite",
        "shimmer": "shimmer 2s linear infinite",
        "border-glow": "borderGlow 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(37,99,235,0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(37,99,235,0.8)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        particle: {
          "0%": { transform: "translateY(100vh) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": {
            transform: "translateY(-10vh) rotate(720deg)",
            opacity: "0",
          },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        borderGlow: {
          "0%, 100%": { borderColor: "rgba(37,99,235,0.5)" },
          "50%": { borderColor: "rgba(139,92,246,0.8)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glow: "0 0 30px rgba(37,99,235,0.3)",
        "glow-purple": "0 0 30px rgba(139,92,246,0.3)",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        card: "0 4px 24px rgba(0,0,0,0.12)",
        "card-hover": "0 20px 60px rgba(0,0,0,0.24)",
        premium:
          "0 0 0 1px rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.4)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
