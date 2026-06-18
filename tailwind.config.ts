import type { Config } from 'tailwindcss';

import { palette, radius } from './constants/tokens';

const config: Config = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: palette.primary,
        neutral: palette.neutral,
        danger: palette.danger,
        success: palette.success,
        warning: palette.warning,
      },
      borderRadius: {
        sm: `${radius.sm}px`,
        md: `${radius.md}px`,
        lg: `${radius.lg}px`,
        xl: `${radius.xl}px`,
        full: `${radius.full}px`,
      },
    },
  },
  plugins: [],
};

export default config;
