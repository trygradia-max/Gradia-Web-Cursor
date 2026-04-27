import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    borderRadius: {
      none: "0px",
      sm: "0px",
      DEFAULT: "0px",
      md: "0px",
      lg: "0px",
      xl: "0px",
      "2xl": "0px",
      "3xl": "0px",
      full: "0px",
    },
    extend: {
      colors: {
        brand: {
          dark: "var(--black)",
          slate: "var(--gray)",
          light: "var(--light)",
          primary: "var(--blue)",
          "bg-deep": "var(--bg)",
          "bg-band": "var(--bg-band)",
          "card-band": "var(--card-on-band)",
          "text-muted-band": "var(--text-muted-band)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        content: "var(--container-max)",
      },
      spacing: {
        layout: "var(--gap)",
        section: "var(--section-padding-y)",
      },
      gap: {
        layout: "var(--gap)",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(15 23 42 / 0.06), 0 1px 2px -1px rgb(15 23 42 / 0.06)",
        "card-hover":
          "0 10px 15px -3px rgb(15 23 42 / 0.08), 0 4px 6px -4px rgb(15 23 42 / 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
