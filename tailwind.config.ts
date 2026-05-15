import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        amber: "var(--color-amber)",
        "amber-light": "var(--color-amber-light)",
        cream: "var(--color-cream)",
        muted: "var(--color-muted)",
        success: "var(--color-success)",
        forest: "var(--color-forest)"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"]
      },
      boxShadow: {
        glow: "0 18px 48px rgba(49, 43, 38, 0.12)"
      },
      backgroundImage: {
        "amber-radial": "radial-gradient(circle at 50% 0%, rgba(215, 169, 93, 0.24), transparent 42%)"
      }
    }
  },
  plugins: []
};

export default config;
