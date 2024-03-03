// scrollbar-hide.js
const plugin = require('tailwindcss/plugin')
const font = require('./font')

const fontVariants = plugin(function ({ addUtilities }) {
  addUtilities(font)
})

module.exports = fontVariants
