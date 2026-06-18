import { View } from 'react-native';

import { styled } from '../styled';

export const EmptyContainer = styled(View, {
  base: 'flex-1 items-center justify-center gap-4 px-8',
});

export const IconCircle = styled(View, {
  base: 'h-16 w-16 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800',
});

export const TextGroup = styled(View, {
  base: 'items-center gap-1.5',
});
