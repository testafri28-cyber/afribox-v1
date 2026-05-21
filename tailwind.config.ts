import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          primary: '#27AE60',
          dark:    '#1B5E20',
          light:   '#6FCF97',
          bg:      '#EBF7F0',
          soft:    '#D4EDDF',
        },
        brand: {
          off:    '#F7F9F7',
          white:  '#FFFFFF',
          gray:   '#2F2F2F',
          sub:    '#666666',
          mid:    '#999999',
          border: '#EBEBEB',
        },
      },
      fontFamily: {
        heading: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        body:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-dm-mono)', 'Courier New', 'monospace'],
      },
      maxWidth: {
        container: '72rem',
      },
      borderRadius: {
        '2xl': '1rem',
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        pulseRing: {
          '0%':   { transform: 'scale(1)',   opacity: '0.6' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        marquee:      'marquee 45s linear infinite',
        'pulse-ring': 'pulseRing 2.5s ease-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
