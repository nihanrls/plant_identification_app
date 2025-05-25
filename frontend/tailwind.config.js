module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#A3D9A5', // pastel yeşil
          dark: '#6FCF97',
        },
        accent: {
          DEFAULT: '#FFF9C4', // pastel sarı
          dark: '#FFE082',
        },
      },
      borderRadius: {
        xl: '1.5rem',
      },
    },
  },
  plugins: [],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
  ],
}; 