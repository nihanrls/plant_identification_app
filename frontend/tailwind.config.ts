import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // tüm js/ts dosyaları içinde tarama yapar
  ],
  theme: {
    extend: {
      colors: {
        primary: "#A8D5BA", // pastel yeşil
        secondary: "#FFF3B0", // pastel sarı
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
export default config;
