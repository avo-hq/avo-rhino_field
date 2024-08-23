const { primary, blue, gray } = require('../avo/tailwind.custom')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './lib/avo/**/*.rb',

    './app/helpers/**/*.rb',
    './app/views/**/*.erb',
    './app/javascript/**/*.js',
    './app/components/**/*.{erb,rb}',
    './app/controllers/avo/**/*.rb',
    './app/javascript/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        blue,
        gray,
        primary,
      },
    },
  },
  plugins: [],
}
