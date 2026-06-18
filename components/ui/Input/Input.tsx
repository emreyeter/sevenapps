import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  type NativeSyntheticEvent,
  type TextInputFocusEventData,
  type TextInputProps,
} from 'react-native';

import { useThemeColors } from '@/hooks/theme';
import type { TxKey } from '@/i18n/types';
import { Text } from '../Text';
import { FieldContainer, InputField } from './Input.styles';

export type InputProps = Omit<TextInputProps, 'placeholder'> & {
  labelTx?: TxKey;
  placeholderTx?: TxKey;
  error?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
};

export function Input({
  labelTx,
  placeholderTx,
  error,
  helperText,
  required,
  multiline,
  onFocus,
  onBlur,
  className,
  ...props
}: InputProps) {
  const { t } = useTranslation();
  const { colors } = useThemeColors();
  const [focused, setFocused] = useState(false);
  const hasError = Boolean(error);
  const state = hasError ? 'error' : focused ? 'focused' : 'default';

  return (
    <FieldContainer>
      {labelTx ? (
        <Text variant="label" tone="muted">
          {t(labelTx)}
          {required ? <Text tone="danger"> *</Text> : null}
        </Text>
      ) : null}
      <InputField
        state={state}
        field={multiline ? 'multi' : 'single'}
        multiline={multiline}
        className={className}
        placeholder={placeholderTx ? t(placeholderTx) : undefined}
        placeholderTextColor={colors.textMuted}
        textAlignVertical={multiline ? 'top' : 'center'}
        onFocus={(event: NativeSyntheticEvent<TextInputFocusEventData>) => {
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event: NativeSyntheticEvent<TextInputFocusEventData>) => {
          setFocused(false);
          onBlur?.(event);
        }}
        {...props}
      />
      {hasError ? (
        <Text variant="caption" tone="danger">
          {error}
        </Text>
      ) : helperText ? (
        <Text variant="caption" tone="muted">
          {helperText}
        </Text>
      ) : null}
    </FieldContainer>
  );
}
