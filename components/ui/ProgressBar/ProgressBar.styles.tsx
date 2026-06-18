import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import { styled } from '../styled';

export const ProgressTrack = styled(View, {
  base: 'h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800',
});

export const ProgressFill = styled(Animated.View, {
  base: 'h-full rounded-full bg-primary-600',
});
