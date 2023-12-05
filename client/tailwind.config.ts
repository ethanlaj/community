/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      width: {
        '20p': '20%',
        '70p': '70%',
      },
      colors: {
        darkLogo: '#364f6b', // Color Darker blue from CommunityLogo.png
        lightLogo: '#00beff', // Color Lighter blue from CommunityLogo.png
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
