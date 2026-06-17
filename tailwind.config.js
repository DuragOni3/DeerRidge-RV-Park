/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#eef5ef",
          100: "#d6e7d8",
          200: "#aecdb2",
          300: "#7fae86",
          400: "#508a5a",
          500: "#2f6b3a",
          600: "#1f5128",
          700: "#163d1e",
          800: "#0f2d16",
          900: "#0a2010",
          950: "#06150a",
        },
        cream: "#f7f9f5",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};
