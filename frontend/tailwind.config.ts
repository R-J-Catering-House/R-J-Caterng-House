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
<<<<<<< Updated upstream
        cream: "#F8F5EF",
        marfil: "#F8F5EF",
        black: "#201C1A",
        burgundy: "#581825",
        pink: "#D8B4B8",
        emerald: "#581825",
        gold: "#D8B4B8",
        beige: "#E9E1D5",
        ink: "#2D2D2D",
=======
        cream: "#F7F3EC",
        marfil: "#F7F3EC",
        black: "#2D2925",
        burgundy: "#E5A16F",
        emerald: "#7D8B73",
        gold: "#E5A16F",
        beige: "#E8DED0",
        ink: "#2D2925",
        terracotta: "#E5A16F",
        olive: "#7D8B73",
        sand: "#E8DED0",
        mint: "#6ED3B4",
>>>>>>> Stashed changes
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
