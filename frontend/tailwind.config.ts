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
        graphite: {
          lightGray: "#C1C0C2",
          paleBeige: "#F5E9E7",
          palePink: "#ECC5C6",
          mutedOlive: "#837D68",
          grayBlue: "#8A9DB1",
        },
      },
    },
  },
  plugins: [],
};

export default config;
