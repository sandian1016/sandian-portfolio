/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'rgb(0 85 255 / <alpha-value>)',
          soft: 'rgb(0 85 255 / 0.18)',
          muted: 'rgb(0 85 255 / 0.58)',
        },
        // One technology-blue scale for all existing sky / blue / cyan utility
        // classes. 500 is the requested rgba(0,85,255,.9) brand anchor.
        sky: {
          50: 'rgb(239 244 255 / <alpha-value>)',
          100: 'rgb(220 231 255 / <alpha-value>)',
          200: 'rgb(182 204 255 / <alpha-value>)',
          300: 'rgb(131 169 255 / <alpha-value>)',
          400: 'rgb(69 123 255 / <alpha-value>)',
          500: 'rgb(0 85 255 / <alpha-value>)',
          600: 'rgb(0 69 214 / <alpha-value>)',
        },
        blue: {
          300: 'rgb(131 169 255 / <alpha-value>)',
          500: 'rgb(0 85 255 / <alpha-value>)',
          600: 'rgb(0 69 214 / <alpha-value>)',
        },
        cyan: {
          50: 'rgb(239 244 255 / <alpha-value>)',
          100: 'rgb(220 231 255 / <alpha-value>)',
          200: 'rgb(182 204 255 / <alpha-value>)',
          300: 'rgb(131 169 255 / <alpha-value>)',
          400: 'rgb(69 123 255 / <alpha-value>)',
          500: 'rgb(0 85 255 / <alpha-value>)',
          600: 'rgb(0 69 214 / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
