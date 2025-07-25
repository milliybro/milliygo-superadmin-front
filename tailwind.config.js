import { colors } from './src/config/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  important: true,
  theme: {
    extend: {
      container: { center: true },
      colors: {
        primary: {
          light: colors.primary_light,
          DEFAULT: colors.primary,
          dark: colors.primary_dark,
        },

        'light-bg': colors.lightBg,
        'dark-bg': colors.darkBg,

        secondary: {
          DEFAULT: colors.secondary,
          light: colors.secondary_light,
          dark: colors.secondary_dark,
        },

        warn: { DEFAULT: colors.warn, light: colors.warn_light },

        success: {
          DEFAULT: colors.success,
          dark: colors.success_dark,
        },
        danger: {
          DEFAULT: colors.danger,
          dark: colors.danger_dark,
          light: colors.danger_light,
        },

        border: { DEFAULT: colors.border },
      },
    },
  },
  plugins: [],
}
