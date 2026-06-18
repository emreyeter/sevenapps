import { Ionicons } from '@expo/vector-icons';
import { type PressableProps } from 'react-native';

import { useThemeColors } from '@/hooks/theme';
import { IconButtonRoot, type IconButtonVariant } from './IconButton.styles';

type IconName = keyof typeof Ionicons.glyphMap;

export type IconButtonProps = Omit<PressableProps, 'children'> & {
  icon: IconName;
  accessibilityLabel: string;
  size?: number;
  variant?: IconButtonVariant;
  color?: string;
  className?: string;
};

export function IconButton({
  icon,
  accessibilityLabel,
  size = 22,
  variant = 'ghost',
  color,
  disabled = false,
  className,
  ...props
}: IconButtonProps) {
  const { colors } = useThemeColors();
  const iconColor = color ?? (variant === 'solid' ? colors.onPrimary : colors.text);

  return (
    <IconButtonRoot
      variant={variant}
      disabled={disabled}
      hitSlop={8}
      className={[disabled ? 'opacity-40' : '', className].filter(Boolean).join(' ')}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      {...props}>
      <Ionicons name={icon} size={size} color={iconColor} />
    </IconButtonRoot>
  );
}
