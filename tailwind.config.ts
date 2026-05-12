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
        success: "var(--color-success)"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"]
      },
      boxShadow: {
        glow: "0 0 40px rgba(200, 131, 42, 0.22)"
      },
      backgroundImage: {
        "amber-radial": "radial-gradient(circle at 50% 0%, rgba(232, 168, 74, 0.18), transparent 42%)"
      }
    }
  },
  plugins: []
};

export default config;
