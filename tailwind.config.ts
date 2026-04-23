import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0a0a0a",
          slate: "#6b7280",
          light: "#f5f5f5",
          primary: "#3b6ef5",
          "bg-deep": "var(--bg)",
          "bg-band": "var(--bg-band)",
          "card-band": "var(--card-on-band)",
          "text-muted-band": "var(--text-muted-band)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(15 23 42 / 0.06), 0 1px 2px -1px rgb(15 23 42 / 0.06)",
        "card-hover":
          "0 10px 15px -3px rgb(15 23 42 / 0.08), 0 4px 6px -4px rgb(15 23 42 / 0.08)",
      },
      borderRadius: {
        xl: "12px",
      },
    },
  },
  plugins: [],
};

export default config;
