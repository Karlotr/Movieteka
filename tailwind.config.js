/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // your content paths, e.g.:
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};
