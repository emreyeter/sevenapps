import { ActivityIndicator, type ActivityIndicatorProps } from 'react-native';

import { useThemeColors } from '@/hooks/theme';

export type SpinnerProps = ActivityIndicatorProps;

export function Spinner({ color, ...props }: SpinnerProps) {
  const { colors } = useThemeColors();
  return <ActivityIndicator color={color ?? colors.primary} {...props} />;
}
