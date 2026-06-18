import { Pressable } from 'react-native';

import { styled } from '../styled';
import type { TextTone } from '../Text/Text.styles';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export const ButtonRoot = styled(Pressable, {
  base: 'flex-row items-center justify-center rounded-xl',
  variants: {
    variant: {
      primary: 'bg-primary-600 active:bg-primary-700',
      secondary: 'bg-neutral-100 active:bg-neutral-200 dark:bg-neutral-800 dark:active:bg-neutral-700',
      ghost: 'active:bg-neutral-100 dark:active:bg-neutral-800',
      danger: 'bg-danger active:opacity-90',
    },
    size: {
      sm: 'h-10 px-4 gap-1.5',
      md: 'h-12 px-5 gap-2',
      lg: 'h-14 px-6 gap-2',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export const buttonLabelTone: Record<ButtonVariant, TextTone> = {
  primary: 'inverse',
  secondary: 'default',
  ghost: 'default',
  danger: 'inverse',
};
