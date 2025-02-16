import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#06E35E",
        secondary: "#3D52D5",
        black: "#0D1321",
      },
      boxShadow: {
        header: "0px 2px 5px 2px rgb(0 0 0 / 0.1)"
      }
    },
  },
  plugins: [],
} satisfies Config;
