/** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{html,js}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
module.exports = {
  content: [
    "./index.html",
    "./components/*.{html,js}",
    "./src/**/*.{html,js}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
