import { Text as RNText } from 'react-native';

import { styled } from '../styled';

export type TextVariant =
  | 'display'
  | 'title'
  | 'subtitle'
  | 'body'
  | 'caption'
  | 'label';

export type TextTone = 'default' | 'muted' | 'primary' | 'danger' | 'inverse';

export const StyledText = styled(RNText, {
  variants: {
    variant: {
      display: 'text-[32px] font-bold leading-[38px]',
      title: 'text-2xl font-bold leading-8',
      subtitle: 'text-lg font-semibold leading-6',
      body: 'text-base leading-[22px]',
      caption: 'text-[13px] leading-[18px]',
      label: 'text-sm font-medium leading-5',
    },
    tone: {
      default: 'text-neutral-900 dark:text-neutral-50',
      muted: 'text-neutral-500 dark:text-neutral-400',
      primary: 'text-primary-600',
      danger: 'text-danger',
      inverse: 'text-white',
    },
  },
  defaultVariants: {
    variant: 'body',
    tone: 'default',
  },
});
