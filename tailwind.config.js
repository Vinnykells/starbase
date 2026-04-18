/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'sans-serif'],
        mono: ['SF Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        space: {
          black:  '#080810',
          dark:   '#0d0d1a',
          card:   '#12121f',
          border: '#1e1e35',
          gray:   '#6b7280',
          white:  '#f0f0ff',
        },
        cosmic: {
          blue:   '#4f8ef7',
          purple: '#8b5cf6',
          cyan:   '#06b6d4',
          pink:   '#ec4899',
          orange: '#f97316',
          green:  '#10b981',
        },
      },
      animation: {
        'twinkle':    'twinkle 3s ease-in-out infinite',
        'orbit':      'orbit 20s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'float':      'float 6s ease-in-out infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.3', transform: 'scale(0.8)' },
        },
        orbit: {
          '0%':   { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-15px)' },
        },
      },
    },
  },
  plugins: [],
}
