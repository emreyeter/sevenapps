import { Image } from 'expo-image';
import { Text as RNText, View } from 'react-native';

import { styled } from '@/components/ui/styled';

export const ThumbWrapper = styled(View, {
  base: 'items-center justify-center overflow-hidden rounded-md bg-neutral-100 dark:bg-neutral-800',
});

export const ThumbImage = styled(Image, { base: 'h-full w-full' });

export const PlayOverlay = styled(View, {
  base: 'absolute h-full w-full items-center justify-center',
});

export const PlayBadge = styled(View, {
  base: 'h-9 w-9 items-center justify-center rounded-full bg-black/45',
});

export const DurationBadge = styled(View, {
  base: 'absolute bottom-1 right-1 rounded bg-black/65 px-1.5 py-0.5',
});

export const DurationLabel = styled(RNText, {
  base: 'text-[11px] font-semibold text-white',
});
