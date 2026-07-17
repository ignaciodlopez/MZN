import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
    },
    extend: {
      colors: {
        background: "var(--color-background)",
        "background-soft": "var(--color-background-soft)",
        surface: "var(--color-surface)",
        foreground: "var(--color-foreground)",
        muted: "var(--color-muted)",
        accent: "var(--color-accent)",
        error: "var(--color-error)",
        success: "var(--color-success)",
        line: "var(--color-border)",
        "line-strong": "var(--color-border-strong)",
      },
      fontFamily: {
        body: "var(--font-body)",
        display: "var(--font-display)",
        serif: "var(--font-serif)",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      spacing: {
        section: "clamp(6rem, 14vh, 11rem)",
      },
    },
  },
  plugins: [],
} satisfies Config;
