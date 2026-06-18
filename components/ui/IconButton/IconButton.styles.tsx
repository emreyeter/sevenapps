import { Pressable } from 'react-native';

import { styled } from '../styled';

export type IconButtonVariant = 'solid' | 'soft' | 'ghost';

export const IconButtonRoot = styled(Pressable, {
  base: 'h-11 w-11 items-center justify-center rounded-full',
  variants: {
    variant: {
      solid: 'bg-primary-600 active:bg-primary-700',
      soft: 'bg-neutral-100 active:bg-neutral-200 dark:bg-neutral-800 dark:active:bg-neutral-700',
      ghost: 'active:bg-neutral-100 dark:active:bg-neutral-800',
    },
  },
  defaultVariants: {
    variant: 'ghost',
  },
});
