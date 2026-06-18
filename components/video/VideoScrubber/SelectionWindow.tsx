import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { palette } from '@/constants/tokens';

export type SelectionWindowProps = {
  left: number;
  width: number;
};

export function SelectionWindow({ left, width }: SelectionWindowProps) {
  return (
    <View pointerEvents="none" style={[styles.frame, { left, width }]}>
      <View style={[styles.handle, styles.handleLeft]}>
        <View style={styles.grip} />
      </View>
      <View style={[styles.handle, styles.handleRight]}>
        <View style={styles.grip} />
      </View>
      <View style={styles.centerLine} pointerEvents="none" />
      <View style={styles.marker} pointerEvents="none">
        <View style={styles.markerBox}>
          <Ionicons name="cut" size={16} color={palette.neutral[900]} />
        </View>
        <View style={styles.markerTip} />
      </View>
    </View>
  );
}

const RADIUS = 10;
const HANDLE_WIDTH = 18;
const BORDER = 3;

const styles = StyleSheet.create({
  frame: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    borderWidth: BORDER,
    borderColor: palette.primary[500],
    borderRadius: RADIUS,
    zIndex: 2,
  },
  handle: {
    position: 'absolute',
    top: -BORDER,
    bottom: -BORDER,
    width: HANDLE_WIDTH,
    backgroundColor: palette.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  handleLeft: {
    left: -BORDER,
    borderTopLeftRadius: RADIUS,
    borderBottomLeftRadius: RADIUS,
  },
  handleRight: {
    right: -BORDER,
    borderTopRightRadius: RADIUS,
    borderBottomRightRadius: RADIUS,
  },
  grip: {
    width: 2,
    height: 22,
    borderRadius: 1,
    backgroundColor: palette.neutral[0],
  },
  centerLine: {
    position: 'absolute',
    top: -10,
    bottom: -10,
    left: '50%',
    width: 2,
    marginLeft: -1,
    borderRadius: 1,
    backgroundColor: palette.warning,
  },
  marker: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerBox: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: palette.neutral[0],
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerTip: {
    width: 0,
    height: 0,
    marginTop: -2,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: palette.neutral[0],
  },
});
