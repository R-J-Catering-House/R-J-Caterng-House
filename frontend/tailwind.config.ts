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
        cream: "#F8F5EF",
        marfil: "#F8F5EF",
        black: "#201C1A",
        burgundy: "#5B2432",
        emerald: "#5B2432",
        gold: "#C2A16A",
        beige: "#E9E1D5",
        ink: "#201C1A",
        graphite: {
          lightGray: "#C1C0C2",
          paleBeige: "#F5E9E7",
          palePink: "#ECC5C6",
          mutedOlive: "#837D68",
          grayBlue: "#8A9DB1",
        },
        fontFamily: {
          display: "var(--font-display), Georgia, serif",
          sans: "var(--font-sans), Arial, sans-serif",
        },
      },
    },
  },
  plugins: [],
};

export default config;
