export const palette = {
  primary: {
    DEFAULT: '#7c5cfc',
    50: '#f1eeff',
    100: '#e4ddff',
    200: '#cbbcff',
    300: '#ad95ff',
    400: '#936ffd',
    500: '#7c5cfc',
    600: '#6638ef',
    700: '#5728d1',
    800: '#4622a6',
    900: '#3a2186',
  },
  neutral: {
    0: '#ffffff',
    50: '#f7f7f8',
    100: '#ededf0',
    200: '#d9d9e0',
    300: '#bcbcc7',
    400: '#9494a3',
    500: '#6f6f7e',
    600: '#54545f',
    700: '#3d3d46',
    800: '#27272d',
    850: '#1c1c21',
    900: '#141417',
    950: '#0a0a0c',
  },
  success: '#22c55e',
  danger: '#ef4444',
  warning: '#f59e0b',
} as const;

export const radius = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  full: 9999,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
} as const;
