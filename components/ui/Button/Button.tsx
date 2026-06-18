import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, type PressableProps } from 'react-native';

import { useThemeColors } from '@/hooks/theme';
import type { TxKey } from '@/i18n/types';
import { Text } from '../Text';
import {
  ButtonRoot,
  buttonLabelTone,
  type ButtonSize,
  type ButtonVariant,
} from './Button.styles';

export type ButtonProps = Omit<PressableProps, 'children'> & {
  tx: TxKey;
  txValues?: Record<string, string | number>;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  className?: string;
};

export function Button({
  tx,
  txValues,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = true,
  leftSlot,
  rightSlot,
  className,
  ...props
}: ButtonProps) {
  const { t } = useTranslation();
  const { colors } = useThemeColors();
  const isDisabled = disabled || loading;
  const spinnerColor =
    variant === 'primary' || variant === 'danger' ? colors.onPrimary : colors.primary;

  return (
    <ButtonRoot
      variant={variant}
      size={size}
      disabled={isDisabled}
      className={[
        fullWidth ? 'w-full' : '',
        isDisabled ? 'opacity-50' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      {...props}>
      {loading ? (
        <ActivityIndicator color={spinnerColor} />
      ) : (
        <>
          {leftSlot}
          <Text variant="label" tone={buttonLabelTone[variant]}>
            {t(tx, txValues)}
          </Text>
          {rightSlot}
        </>
      )}
    </ButtonRoot>
  );
}
