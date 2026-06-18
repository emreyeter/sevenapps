import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styled } from './styled';

export const SafeArea = styled(SafeAreaView, {
  base: 'flex-1 bg-neutral-50 dark:bg-neutral-950',
});

export const Center = styled(View, {
  base: 'flex-1 items-center justify-center',
});

export const Column = styled(View, { base: 'flex-col' });
