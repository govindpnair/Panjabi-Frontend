/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // ✅ Dark Mode এর জন্য class-based সিস্টেম
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // ✅ সব ফাইলে Tailwind কাজ করবে
  theme: {
    extend: {},
  },
  plugins: [],
};
