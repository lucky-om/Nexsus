/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#090D16',
          900: '#0D1117',
          800: '#141B2D',
          700: '#1C2333',
          600: '#242E42',
        },
        cyber: {
          cyan: '#00F2FE',
          blue: '#4FACFE',
          emerald: '#10B981',
          green: '#00FF87',
        },
        warn: {
          red: '#EF4444',
          amber: '#F59E0B',
          orange: '#F97316',
        },
        slate: {
          white: '#F8FAFC',
        },
      },
      fontFamily: {
        'display': ['"Space Grotesk"', 'Inter', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'matrix': 'matrix 20s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #00F2FE, 0 0 10px #00F2FE' },
          '100%': { boxShadow: '0 0 20px #00F2FE, 0 0 40px #00F2FE, 0 0 80px #00F2FE' },
        },
        matrix: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'cyber': '0 0 20px rgba(0, 242, 254, 0.3)',
        'cyber-lg': '0 0 40px rgba(0, 242, 254, 0.4)',
        'warn': '0 0 20px rgba(239, 68, 68, 0.4)',
        'emerald': '0 0 20px rgba(16, 185, 129, 0.4)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(0,242,254,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,242,254,0.03) 1px, transparent 1px)',
        'hero-glow': 'radial-gradient(ellipse at center, rgba(0,242,254,0.15) 0%, rgba(9,13,22,0) 70%)',
        'card-gradient': 'linear-gradient(135deg, rgba(28,35,51,0.8) 0%, rgba(20,27,45,0.9) 100%)',
      },
    },
  },
  plugins: [],
}
