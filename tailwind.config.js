module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'glory': ['Glory', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      colors: {
        'ekonavHomeBg': '#E5E5E5',
        'ekonavGray': '#4F4F65',
        'ekonavPurple': '#5A36FF',
        'ekonavLink': '#1B1A2B',
      },
      boxShadow: {
        'notification': '0 0.125rem 0.125rem rgba(0, 0, 0, 0.25);',
      }
    },
  },
  plugins: [],
}