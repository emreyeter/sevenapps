import { useColorScheme } from 'nativewind';

import { COLOR_SCHEMES, type ColorScheme } from '@/constants/colorScheme';
import { semanticColors, type SemanticColors } from '@/constants/theme';

export function useThemeColors(): { scheme: ColorScheme; colors: SemanticColors } {
  const { colorScheme } = useColorScheme();
  const scheme: ColorScheme =
    colorScheme === COLOR_SCHEMES.DARK ? COLOR_SCHEMES.DARK : COLOR_SCHEMES.LIGHT;
  return { scheme, colors: semanticColors[scheme] };
}
