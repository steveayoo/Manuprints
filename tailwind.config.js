/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mp-blue': '#00BFFF',
        'mp-dark': '#050810',
        'mp-card': '#0A0F1E',
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'cursive'],
        outfit: ['"Outfit"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}