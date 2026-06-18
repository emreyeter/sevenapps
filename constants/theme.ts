import { COLOR_SCHEMES, type ColorScheme } from './colorScheme';
import { palette } from './tokens';

export interface SemanticColors {
  primary: string;
  onPrimary: string;
  danger: string;
  success: string;
  warning: string;
  videoSurface: string;
  background: string;
  surface: string;
  surfaceMuted: string;
  border: string;
  text: string;
  textMuted: string;
  icon: string;
}

const shared = {
  primary: palette.primary[600],
  onPrimary: palette.neutral[0],
  danger: palette.danger,
  success: palette.success,
  warning: palette.warning,
  videoSurface: palette.neutral[900],
};

export const semanticColors: Record<ColorScheme, SemanticColors> = {
  [COLOR_SCHEMES.LIGHT]: {
    ...shared,
    background: palette.neutral[50],
    surface: palette.neutral[0],
    surfaceMuted: palette.neutral[100],
    border: palette.neutral[200],
    text: palette.neutral[900],
    textMuted: palette.neutral[500],
    icon: palette.neutral[400],
  },
  [COLOR_SCHEMES.DARK]: {
    ...shared,
    background: palette.neutral[950],
    surface: palette.neutral[900],
    surfaceMuted: palette.neutral[850],
    border: palette.neutral[800],
    text: palette.neutral[50],
    textMuted: palette.neutral[400],
    icon: palette.neutral[400],
  },
};
