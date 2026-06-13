/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: "#032B30",
          DEFAULT: "#0A84B1",
          bright: "#0D61B9",
        },
        accent: {
          orange: "#E67E22",
          yellow: "#F1C40F",
        },
        secondary: {
          DEFAULT: "#FFFFFF",
          light: "#F8F9FA",
          dark: "#2D3436",
        },
        brand: {
          teal: "#032B30",
          blue: "#0A84B1",
          bright: "#0D61B9",
          orange: "#E67E22",
          yellow: "#F1C40F",
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Epilogue"', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      },
    },
  },
  plugins: [],
}
