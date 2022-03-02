module.exports = {
  content: [
    "./app/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
      animation: {
        blink: 'blink 1.5s step-end infinite',
      },
    },
  },
  plugins: [],
}
