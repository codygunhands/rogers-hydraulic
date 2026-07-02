import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        graphite: {
          DEFAULT: "#1E2329",
          900: "#14181C",
          800: "#1E2329",
          700: "#282E36",
          600: "#333A44",
          500: "#3F4752",
        },
        hivis: {
          DEFAULT: "#D3FF00",
          dark: "#B8E000",
        },
        smoke: "#F4F4F1",
        // brighter, more readable body/muted text (was #6B7280 — too dark on graphite)
        steel: "#9AA3AE",
        amber: {
          DEFAULT: "#F79A1B",
        },
      },
      fontFamily: {
        // Provided via next/font CSS variables in layout.tsx
        heading: ["var(--font-oswald)", "'Oswald'", "system-ui", "sans-serif"],
        label: ["var(--font-oswald)", "'Oswald'", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        stencil: "0.02em",
      },
      maxWidth: {
        content: "1200px",
      },
      backgroundImage: {
        "plate-grid":
          "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        "hazard":
          "repeating-linear-gradient(45deg, #D3FF00 0, #D3FF00 12px, #1E2329 12px, #1E2329 24px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
