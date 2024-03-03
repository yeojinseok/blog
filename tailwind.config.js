const { range } = require('lodash')
const plugins = require('tailwindcss/plugin')

const pxToRem = (px, base = 16) => `${px / base}rem`
//https://fe-developers.kakaoent.com/2022/221013-tailwind-and-design-system/

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    minHeight: {
      ...range(0, 500).reduce((acc, px) => {
        acc[`${px}`] = pxToRem(px)
        return acc
      }, {}),
      full: '100%',
    },
    minWidth: {
      ...range(0, 500).reduce((acc, px) => {
        acc[`${px}`] = pxToRem(px)
        return acc
      }, {}),
      full: '100%',
    },
    spacing: {
      ...range(0, 500).reduce((acc, px) => {
        acc[`${px}`] = pxToRem(px)
        return acc
      }, {}),
    },
    borderWidth: {
      ...range(0, 500).reduce((acc, px) => {
        acc[`${px}`] = pxToRem(px)
        return acc
      }, {}),
    },
    borderRadius: {
      ...range(0, 500).reduce((acc, px) => {
        acc[`${px}`] = pxToRem(px)
        return acc
      }, {}),
    },
    colors: {
      primary: {
        main: '#53A1E9',
        secondary: '#00a67d',
      },
      highLight: '#df2f7a',
      secondary: '#C4C4C4',
      text: {
        main: '#ffffff',
        secondary: '#9b9b9b',
      },
      bgColor: {
        main: '#171717',
        secondary: '#212121',
      },

      grey: {
        50: '#EBEBEB',
        100: '#DEDEDE',
        200: '#C4C4C4',
        300: '#ABABAB',
        400: '#919191',
        500: '#787878',
        600: '#5E5E5E',
        700: '#454545',
        800: '#2B2B2B',
        900: '#121212',
      },
    },
    extend: {},
    screens: {
      mobile: '360px', // @media (min-width: 360px)
      foldable: '523px', // @media (min-width: 523px)
      tablet: '768px', // @media (min-width: 768px)
      'under-foldable': { max: '522px' }, // @media (max-width: 522px)
      'under-tablet': { max: '767px' }, // @media (max-width: 767px)
      'under-mobile': { max: '359px' }, // @media (max-width: 359px)

      mobile: '330px',
      small_devices: '600px',
      medium_devices: '768px',
      large_devices: '992px',
      // => @media (min-width: 640px) { ... }

      laptop: '1124px',
      // => @media (min-width: 1024px) { ... }

      desktop_middle: '1280px',
      // => @media (min-width: 1280px) { ... }
      desktop_full: '1640px',
    },
  },

  plugins: [
    require('./tailwind-plugins/scrollbar-hide'),
    require('./tailwind-plugins/font-variants'),
  ],
}
