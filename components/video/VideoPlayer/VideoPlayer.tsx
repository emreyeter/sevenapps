import { useVideoPlayer, VideoView, type VideoContentFit } from 'expo-video';
import { useRef } from 'react';

import { Player, PlayerWrapper } from './VideoPlayer.styles';

export type VideoPlayerProps = {
  uri: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  nativeControls?: boolean;
  contentFit?: VideoContentFit;
};

export function VideoPlayer({
  uri,
  autoPlay = false,
  loop = false,
  muted = false,
  nativeControls = true,
  contentFit = 'contain',
}: VideoPlayerProps) {
  const player = useVideoPlayer(uri, (instance) => {
    instance.loop = loop;
    instance.muted = muted;
    if (autoPlay) {
      instance.play();
    }
  });

  const viewRef = useRef<VideoView>(null);

  return (
    <PlayerWrapper>
      <Player
        ref={viewRef}
        player={player}
        contentFit={contentFit}
        nativeControls={nativeControls}
        fullscreenOptions={{ enable: true }}
        allowsPictureInPicture
      />
    </PlayerWrapper>
  );
}
