import { Ionicons } from '@expo/vector-icons';
import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';

import { Button, Screen } from '@/components/ui';
import { VideoScrubber } from '@/components/video';
import { palette } from '@/constants/tokens';
import { useCropStore } from '@/store/cropStore';

export type TrimStepProps = {
  onNext: () => void;
};

export function TrimStep({ onNext }: TrimStepProps) {
  const { t } = useTranslation();
  const sourceUri = useCropStore((state) => state.sourceUri);
  const durationSec = useCropStore((state) => state.durationSec);
  const segmentSec = useCropStore((state) => state.segmentSec);
  const startSec = useCropStore((state) => state.startSec);
  const setStart = useCropStore((state) => state.setStart);
  const setSource = useCropStore((state) => state.setSource);

  const player = useVideoPlayer(sourceUri ?? '', (instance) => {
    instance.timeUpdateEventInterval = 0.2;
    instance.loop = false;
  });

  const timeUpdate = useEvent(player, 'timeUpdate', {
    currentTime: 0,
    currentLiveTimestamp: null,
    currentOffsetFromLive: null,
    bufferedPosition: 0,
  });
  const currentTime = timeUpdate?.currentTime ?? 0;
  const { isPlaying } = useEvent(player, 'playingChange', {
    isPlaying: player.playing,
  });
  const { status } = useEvent(player, 'statusChange', { status: player.status });

  useEffect(() => {
    if (status === 'readyToPlay' && durationSec <= 0 && player.duration > 0 && sourceUri) {
      setSource(sourceUri, player.duration);
    }
  }, [status, durationSec, player, sourceUri, setSource]);

  useEffect(() => {
    const end = startSec + segmentSec;
    if (currentTime >= end - 0.02) {
      player.currentTime = startSec;
    }
  }, [currentTime, startSec, segmentSec, player]);

  const handleChangeStart = useCallback(
    (sec: number) => {
      setStart(sec);
      player.currentTime = sec;
    },
    [player, setStart],
  );

  const togglePlayback = useCallback(() => {
    if (isPlaying) {
      player.pause();
      return;
    }
    const end = startSec + segmentSec;
    if (currentTime < startSec || currentTime >= end - 0.05) {
      player.currentTime = startSec;
    }
    player.play();
  }, [currentTime, isPlaying, player, segmentSec, startSec]);

  if (!sourceUri) {
    return null;
  }

  return (
    <Screen
      safeArea={false}
      footer={<Button tx="common.next" onPress={onNext} />}>
      <View className="flex-1 justify-center gap-6">
        <View className="aspect-video w-full overflow-hidden rounded-xl bg-neutral-900">
          <VideoView
            player={player}
            className="flex-1"
            contentFit="contain"
            nativeControls={false}
          />
          <Pressable
            onPress={togglePlayback}
            accessibilityRole="button"
            accessibilityLabel={isPlaying ? t('crop.pauseA11y') : t('crop.playA11y')}
            className="absolute h-full w-full items-center justify-center">
            {!isPlaying ? (
              <View className="h-14 w-14 items-center justify-center rounded-full bg-black/50">
                <Ionicons name="play" size={28} color={palette.neutral[0]} />
              </View>
            ) : null}
          </Pressable>
        </View>

        <VideoScrubber
          sourceUri={sourceUri}
          durationSec={durationSec}
          segmentSec={segmentSec}
          startSec={startSec}
          onChangeStart={handleChangeStart}
          progressSec={currentTime}
        />
      </View>
    </Screen>
  );
}
