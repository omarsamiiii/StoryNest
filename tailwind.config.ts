import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        sky: "hsl(var(--sky))",
        mint: "hsl(var(--mint))",
        berry: "hsl(var(--berry))",
        storybook: "hsl(var(--storybook))"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(88, 64, 42, 0.13)",
        story: "0 18px 0 rgba(63, 45, 31, 0.08), 0 24px 60px rgba(88, 64, 42, 0.16)",
        glow: "0 0 0 6px rgba(255, 190, 92, 0.20), 0 20px 65px rgba(130, 79, 255, 0.20)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
