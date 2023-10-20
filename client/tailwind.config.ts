/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      width: {
        '70p': '70%',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
