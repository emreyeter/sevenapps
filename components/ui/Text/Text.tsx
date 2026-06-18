import { useTranslation } from 'react-i18next';
import { type TextProps as RNTextProps } from 'react-native';

import type { TxKey } from '@/i18n/types';
import { StyledText, type TextTone, type TextVariant } from './Text.styles';

export type TextProps = RNTextProps & {
  variant?: TextVariant;
  tone?: TextTone;
  tx?: TxKey;
  txValues?: Record<string, string | number>;
};

export function Text({
  variant = 'body',
  tone = 'default',
  tx,
  txValues,
  children,
  ...props
}: TextProps) {
  const { t } = useTranslation();

  return (
    <StyledText variant={variant} tone={tone} {...props}>
      {tx ? t(tx, txValues) : children}
    </StyledText>
  );
}
