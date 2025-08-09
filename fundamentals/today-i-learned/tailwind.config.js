/**
 * Minimal Tailwind config for the new UI reset-first approach.
 * - No theme variables
 * - No plugins
 * - No dark mode presets
 * Pages/components should style themselves with utilities.
 *
 * If you need to expand the theme later, extend here conservatively.
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};