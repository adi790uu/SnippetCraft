/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      ubuntu: ["Ubuntu"],
      roboto: ["roboto-mono"]
    }
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [],
}