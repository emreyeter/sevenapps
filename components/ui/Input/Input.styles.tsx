import { TextInput, View } from 'react-native';

import { styled } from '../styled';

export const FieldContainer = styled(View, { base: 'gap-1.5' });

export const InputField = styled(TextInput, {
  base: 'rounded-xl border px-4 text-[16px] text-neutral-900 dark:text-neutral-50 bg-white dark:bg-neutral-900',
  variants: {
    state: {
      default: 'border-neutral-200 dark:border-neutral-800',
      focused: 'border-primary-600',
      error: 'border-danger',
    },
    field: {
      single: 'h-12',
      multi: 'min-h-[112px] py-3',
    },
  },
  defaultVariants: {
    state: 'default',
    field: 'single',
  },
});
