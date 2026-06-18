import { useCallback, useEffect, useRef, useState } from 'react';
import { type LayoutChangeEvent, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Spinner, Text } from '@/components/ui';
import { FILMSTRIP_FRAME_COUNT } from '@/constants/video';
import { formatTimecode } from '@/lib/format';
import { impactLight, selectionTick } from '@/lib/haptics';
import { Filmstrip } from './Filmstrip';
import { Playhead } from './Playhead';
import { SelectionWindow } from './SelectionWindow';
import {
  RangePill,
  ScrubberContainer,
  ScrubberRow,
  TrackLayer,
} from './VideoScrubber.styles';
import { useFilmstrip } from './useFilmstrip';

const TRACK_HEIGHT = 64;
const MIN_WINDOW_PX = 84;
const DIM_COLOR = 'rgba(0, 0, 0, 0.55)';

export type VideoScrubberProps = {
  sourceUri: string;
  durationSec: number;
  segmentSec: number;
  startSec: number;
  onChangeStart: (startSec: number) => void;
  progressSec?: number;
};

export function VideoScrubber({
  sourceUri,
  durationSec,
  segmentSec,
  startSec,
  onChangeStart,
  progressSec = 0,
}: VideoScrubberProps) {
  const { frames, isLoading } = useFilmstrip(sourceUri, durationSec);
  const [trackWidth, setTrackWidth] = useState(0);
  const [liveStartSec, setLiveStartSec] = useState(startSec);
  const isDragging = useRef(false);

  const proportionalPx =
    durationSec > 0 ? (segmentSec / durationSec) * trackWidth : 0;
  const windowWidthPx =
    trackWidth > 0 ? Math.min(trackWidth, Math.max(MIN_WINDOW_PX, proportionalPx)) : 0;
  const maxLeftPx = Math.max(0, trackWidth - windowWidthPx);
  const maxStartSec = Math.max(0, durationSec - segmentSec);

  const offsetX = useSharedValue(0);
  const windowW = useSharedValue(0);
  const maxLeft = useSharedValue(0);
  const dragStart = useSharedValue(0);
  const playheadFrac = useSharedValue(0);

  const offsetToStart = useCallback(
    (px: number) => (maxStartSec > 0 && maxLeftPx > 0 ? (px / maxLeftPx) * maxStartSec : 0),
    [maxLeftPx, maxStartSec],
  );

  const startToOffset = useCallback(
    (sec: number) => (maxStartSec > 0 ? (sec / maxStartSec) * maxLeftPx : 0),
    [maxLeftPx, maxStartSec],
  );

  useEffect(() => {
    windowW.value = windowWidthPx;
    maxLeft.value = maxLeftPx;
    if (!isDragging.current) {
      offsetX.value = startToOffset(startSec);
      setLiveStartSec(startSec);
    }
  }, [
    trackWidth,
    windowWidthPx,
    maxLeftPx,
    startSec,
    startToOffset,
    offsetX,
    windowW,
    maxLeft,
  ]);

  useEffect(() => {
    const frac = segmentSec > 0 ? (progressSec - startSec) / segmentSec : 0;
    playheadFrac.value = withTiming(Math.min(1, Math.max(0, frac)), { duration: 120 });
  }, [progressSec, startSec, segmentSec, playheadFrac]);

  const setDragging = useCallback((value: boolean) => {
    isDragging.current = value;
  }, []);

  const updateLiveStart = useCallback(
    (px: number) => setLiveStartSec(offsetToStart(px)),
    [offsetToStart],
  );

  const commitOffset = useCallback(
    (px: number) => {
      const sec = offsetToStart(px);
      setLiveStartSec(sec);
      onChangeStart(sec);
    },
    [offsetToStart, onChangeStart],
  );

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setTrackWidth(event.nativeEvent.layout.width);
  }, []);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      dragStart.value = offsetX.value;
      runOnJS(setDragging)(true);
    })
    .onUpdate((event) => {
      const next = Math.min(
        Math.max(dragStart.value + event.translationX, 0),
        maxLeft.value,
      );
      if ((next === 0 || next === maxLeft.value) && next !== offsetX.value) {
        runOnJS(impactLight)();
      }
      offsetX.value = next;
      runOnJS(updateLiveStart)(next);
    })
    .onEnd(() => {
      runOnJS(selectionTick)();
      runOnJS(setDragging)(false);
      runOnJS(commitOffset)(offsetX.value);
    });

  const tapGesture = Gesture.Tap().onEnd((event) => {
    const target = Math.min(
      Math.max(event.x - windowW.value / 2, 0),
      maxLeft.value,
    );
    offsetX.value = withTiming(target, { duration: 180 });
    runOnJS(commitOffset)(target);
  });

  const trackGesture = Gesture.Race(panGesture, tapGesture);

  const liveOffsetPx = startToOffset(liveStartSec);
  const rightDimLeft = liveOffsetPx + windowWidthPx;

  const playheadStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offsetX.value + playheadFrac.value * windowW.value }],
    opacity: windowW.value > 0 ? 1 : 0,
  }));

  return (
    <ScrubberContainer>
      <ScrubberRow>
        <Text
          variant="caption"
          tone="muted"
          tx="crop.scrubberHint"
          txValues={{ seconds: Math.round(segmentSec) }}
        />
        <View className="flex-row items-center gap-2">
          {isLoading ? <Spinner size="small" /> : null}
          <RangePill>
            <Text variant="caption" tone="inverse">
              {formatTimecode(liveStartSec)} – {formatTimecode(liveStartSec + segmentSec)}
            </Text>
          </RangePill>
        </View>
      </ScrubberRow>

      <View
        onLayout={onLayout}
        className="w-full justify-center"
        style={{ height: TRACK_HEIGHT }}>
        <GestureDetector gesture={trackGesture}>
          <TrackLayer>
            <View className="absolute inset-0 overflow-hidden rounded-md">
              <Filmstrip frames={frames} frameCount={FILMSTRIP_FRAME_COUNT} />
              {windowWidthPx > 0 ? (
                <>
                  <View
                    pointerEvents="none"
                    style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left: 0,
                      width: liveOffsetPx,
                      backgroundColor: DIM_COLOR,
                    }}
                  />
                  <View
                    pointerEvents="none"
                    style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left: rightDimLeft,
                      width: Math.max(0, trackWidth - rightDimLeft),
                      backgroundColor: DIM_COLOR,
                    }}
                  />
                </>
              ) : null}
            </View>
            {windowWidthPx > 0 ? (
              <SelectionWindow left={liveOffsetPx} width={windowWidthPx} />
            ) : null}
            <Playhead animatedStyle={playheadStyle} />
          </TrackLayer>
        </GestureDetector>
      </View>

      <ScrubberRow>
        <Text variant="caption" tone="muted">
          {formatTimecode(0)}
        </Text>
        <Text variant="caption" tone="muted">
          {formatTimecode(durationSec)}
        </Text>
      </ScrubberRow>
    </ScrubberContainer>
  );
}
