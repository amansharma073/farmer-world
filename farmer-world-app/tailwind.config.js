/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '2xl': '1536px',
      },
      colors: {
        green: {
          50:  '#f0faf4',
          100: '#dcf5e7',
          200: '#b8e8cc',
          300: '#9fd8b3',
          400: '#6cc494',
          500: '#4db87a',
          600: '#2fa06a',
          700: '#1b6f50',
          800: '#145942',
          900: '#0f3d2e',
          950: '#072518',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 18px rgba(16, 43, 33, 0.08)',
        'card-hover': '0 18px 38px rgba(16,43,33,.16)',
      },
    },
  },
  plugins: [],
}
