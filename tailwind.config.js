/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Ensures all React components are scanned
    "./public/index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

