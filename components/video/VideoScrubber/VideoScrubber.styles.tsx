import { Image } from 'expo-image';
import { View } from 'react-native';

import { styled } from '@/components/ui/styled';

export const FilmstripRow = styled(View, {
  base: 'flex-1 flex-row overflow-hidden rounded-md bg-neutral-800',
});

export const FilmstripCell = styled(View, {
  base: 'h-full flex-1 border-r border-neutral-900/40',
});

export const FilmstripImage = styled(Image, { base: 'h-full w-full' });

export const FilmstripPlaceholder = styled(View, { base: 'h-full w-full bg-neutral-700' });

export const ScrubberContainer = styled(View, { base: 'gap-2' });

export const ScrubberRow = styled(View, {
  base: 'flex-row items-center justify-between',
});

export const RangePill = styled(View, {
  base: 'rounded-full bg-primary-600 px-2.5 py-1',
});

export const TrackLayer = styled(View, {
  base: 'absolute h-full w-full rounded-md',
});
