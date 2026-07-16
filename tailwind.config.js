/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#0F172A',
        surface: '#FFFFFF',
        muted: '#64748B',
        accent: '#F97316',
        success: '#22C55E',
        danger: '#EF4444',
        warning: '#F59E0B',
        background: '#F8FAFC',
        'dark-surface': '#0B1220',
        'dark-muted': '#94A3B8',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 12px 30px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
}
