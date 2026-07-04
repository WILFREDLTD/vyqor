// tailwind.config.js
import { defineConfig } from "tailwindcss";

export default defineConfig({
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // QUANTEDGE custom colors
        "qe-bg": "#F9FAFB",
        "qe-primary": "#004AAD",
        "qe-secondary": "#00B3A6",
        "qe-accent": "#FFD66B",
        "qe-text": "#1F2937",
        "qe-muted": "#4B5563",
      },
      fontFamily: {
        // Use CSS variables injected by next/font (Inter, Syne, Outfit)
        primary: ["var(--font-primary)", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial"],
        display: ["var(--font-display)", "var(--font-primary)", "system-ui"],
        ui: ["var(--font-ui)", "var(--font-primary)", "system-ui"],
      },
      maxWidth: {
        "7xl": "1280px",
      },
    },
  },
  plugins: [],
});
