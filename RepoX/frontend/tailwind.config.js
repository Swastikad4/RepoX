/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E11D74",
          light: "#F43F8E",
          dark: "#BE185D",
          hover: "#C01760",
          50: "#FDF2F8",
          100: "#FCE7F3",
          200: "#FBCFE8",
          500: "#EC4899",
          600: "#E11D74",
          700: "#BE185D",
        },
        accent: {
          DEFAULT: "#E11D74",
          magenta: "#E11D74",
          purple: "#D946EF",
        },
        surface: {
          DEFAULT: "#F8F8FA",
          card: "#FFFFFF",
        },
        foreground: "#09090B",
        background: "#F8F8FA",
      },
      fontFamily: {
        inter: ['"Inter"', 'sans-serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      textColor: {
        DEFAULT: "#09090B",
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
};
