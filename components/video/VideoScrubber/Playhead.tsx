import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { type AnimatedStyle } from 'react-native-reanimated';

import { palette } from '@/constants/tokens';

export type PlayheadProps = {
  animatedStyle: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
};

export function Playhead({ animatedStyle }: PlayheadProps) {
  return <Animated.View pointerEvents="none" style={[styles.bar, animatedStyle]} />;
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    width: 3,
    borderRadius: 9999,
    backgroundColor: palette.neutral[0],
  },
});
