import { VideoView } from 'expo-video';
import { View } from 'react-native';

import { styled } from '@/components/ui/styled';

export const PlayerWrapper = styled(View, {
  base: 'aspect-video w-full overflow-hidden rounded-xl bg-neutral-900',
});

export const Player = styled(VideoView, { base: 'flex-1' });
