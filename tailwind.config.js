/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        foreground: '#0F172A',
        // Exact Design System Colors
        'slate': {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          500: '#64748B',
          900: '#0F172A',
        },
        'blue': {
          50: '#E0F3F6',
          100: '#C2E3EA',
          200: '#8DC5D1',
          300: '#5EA9B8',
          400: '#2F8CA0',
          500: '#117488',
          600: '#015B6B',
          700: '#014854',
          800: '#013641',
          900: '#012731',
        }
      },
      borderRadius: {
        none: '0',
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        full: '9999px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgb(0 0 0 / 0.05)',
        'soft-md': '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -1px rgb(0 0 0 / 0.03)',
        'soft-lg': '0 10px 15px -3px rgb(0 0 0 / 0.07), 0 4px 6px -2px rgb(0 0 0 / 0.03)',
        'soft-xl': '0 20px 25px -5px rgb(0 0 0 / 0.07), 0 10px 10px -5px rgb(0 0 0 / 0.02)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 
