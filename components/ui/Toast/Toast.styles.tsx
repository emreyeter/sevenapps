import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import { styled } from '../styled';

export const ToastLayer = styled(View, {
  base: 'absolute left-0 right-0 z-50 gap-2 px-4',
});

export const ToastCard = styled(Animated.View, {
  base: 'flex-row items-center gap-3 rounded-xl border border-neutral-200 bg-white p-3.5 dark:border-neutral-800 dark:bg-neutral-900',
});

export const ToastBody = styled(View, {
  base: 'flex-1 gap-0.5',
});
