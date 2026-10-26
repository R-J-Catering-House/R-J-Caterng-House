import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F8F6F1",
        blush: "#F6E6E3",
        sage: "#8A9A7B",
        "sage-dark": "#6B7B5E",
        "sage-olive": "#7E8068",
        "muted-gold": "#8A7650",
        line: "#D9D3C7",
        gold: "#C9A875",
        rose: "#D9A5A8",
        ink: "#3B352E",
        // legacy aliases kept for class compatibility
        marfil: "#F8F6F1",
        black: "#3B352E",
        burgundy: "#D9A5A8",
        emerald: "#8A9A7B",
        beige: "#F6E6E3",
        terracotta: "#C9A875",
        olive: "#8A9A7B",
        sand: "#F6E6E3",
        mint: "#8A9A7B",
        graphite: {
          lightGray: "#C1C0C2",
          paleBeige: "#F5E9E7",
          palePink: "#ECC5C6",
          mutedOlive: "#837D68",
          grayBlue: "#8A9DB1",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        script: ["var(--font-script)", "cursive"],
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
