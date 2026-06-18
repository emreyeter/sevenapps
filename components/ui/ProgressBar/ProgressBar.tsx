import { useEffect } from 'react';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { ProgressFill, ProgressTrack } from './ProgressBar.styles';

export type ProgressBarProps = {
  progress?: number;
  indeterminate?: boolean;
  className?: string;
};

export function ProgressBar({
  progress = 0,
  indeterminate = false,
  className,
}: ProgressBarProps) {
  const value = useSharedValue(0);

  useEffect(() => {
    if (indeterminate) {
      value.value = withRepeat(
        withTiming(1, { duration: 1100, easing: Easing.inOut(Easing.ease) }),
        -1,
        false,
      );
    } else {
      value.value = withTiming(Math.min(1, Math.max(0, progress)), {
        duration: 250,
      });
    }
  }, [indeterminate, progress, value]);

  const animatedStyle = useAnimatedStyle(() => {
    if (indeterminate) {
      return {
        width: '40%',
        transform: [{ translateX: `${-40 + value.value * 180}%` }],
      };
    }
    return { width: `${value.value * 100}%` };
  });

  return (
    <ProgressTrack className={className}>
      <ProgressFill style={animatedStyle} />
    </ProgressTrack>
  );
}
