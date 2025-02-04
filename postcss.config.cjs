module.exports = {
  plugins: {
    '@tailwindcss/postcss': {
      config: './tailwind.config.cjs'  // Point to CJS Tailwind config
    },
    autoprefixer: {}
  }
}