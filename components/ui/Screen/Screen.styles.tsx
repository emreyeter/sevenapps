import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styled } from '../styled';

export const ScreenSafeArea = styled(SafeAreaView, {
  base: 'flex-1 bg-neutral-50 dark:bg-neutral-950',
});

export const HeaderBar = styled(View, {
  base: 'h-14 flex-row items-center justify-between gap-2 px-2',
});

export const HeaderSlot = styled(View, {
  base: 'min-w-[44px]',
  variants: {
    align: {
      start: 'items-start',
      end: 'items-end',
    },
  },
  defaultVariants: {
    align: 'start',
  },
});

export const Footer = styled(View, {
  base: 'gap-2 px-5 pb-4 pt-3',
});
