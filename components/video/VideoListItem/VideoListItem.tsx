import { Ionicons } from '@expo/vector-icons';
import { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet } from 'react-native';
import ReanimatedSwipeable, {
  type SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  type SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import type { Video } from '@/api/api.types';
import { Text } from '@/components/ui';
import { palette, radius } from '@/constants/tokens';
import { formatRelativeDate } from '@/lib/format';
import { impactLight } from '@/lib/haptics';
import { VideoThumbnail } from '../VideoThumbnail';
import { ItemInfo, ItemRow } from './VideoListItem.styles';

const ACTION_WIDTH = 84;

const styles = StyleSheet.create({
  actionWrap: {
    width: ACTION_WIDTH,
    alignSelf: 'stretch',
  },
  deleteButton: {
    flex: 1,
    width: ACTION_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.lg,
    backgroundColor: palette.danger,
  },
});

const cardShadow = {
  shadowColor: '#000',
  shadowOpacity: 0.06,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 3 },
  elevation: 2,
};

export type VideoListItemProps = {
  video: Video;
  onPress: (video: Video) => void;
  onDelete?: (video: Video) => void;
};

function RightAction({
  drag,
  label,
  onPress,
}: {
  drag: SharedValue<number>;
  label: string;
  onPress: () => void;
}) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: drag.value + ACTION_WIDTH }],
  }));

  return (
    <Reanimated.View style={[styles.actionWrap, animatedStyle]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        onPress={onPress}
        style={({ pressed }) => [
          styles.deleteButton,
          pressed && { opacity: 0.8 },
        ]}>
        <Ionicons name="trash-outline" size={22} color={palette.neutral[0]} />
        <Text variant="caption" tone="inverse" className="mt-1 font-semibold">
          {label}
        </Text>
      </Pressable>
    </Reanimated.View>
  );
}

export function VideoListItem({ video, onPress, onDelete }: VideoListItemProps) {
  const { t } = useTranslation();
  const swipeableRef = useRef<SwipeableMethods>(null);

  const handleDelete = useCallback(() => {
    swipeableRef.current?.close();
    onDelete?.(video);
  }, [onDelete, video]);

  const renderRightActions = useCallback(
    (_progress: SharedValue<number>, drag: SharedValue<number>) => (
      <RightAction drag={drag} label={t('common.delete')} onPress={handleDelete} />
    ),
    [handleDelete, t],
  );

  const row = (
    <ItemRow
      style={cardShadow}
      accessibilityRole="button"
      accessibilityLabel={video.name}
      onPress={() => onPress(video)}>
      <VideoThumbnail
        thumbnailUri={video.thumbnailUri}
        durationMs={video.durationMs}
        className="h-16 w-24"
      />
      <ItemInfo>
        <Text variant="label" numberOfLines={1}>
          {video.name}
        </Text>
        {video.description ? (
          <Text variant="caption" tone="muted" numberOfLines={2}>
            {video.description}
          </Text>
        ) : null}
        <Text variant="caption" tone="muted">
          {formatRelativeDate(video.createdAt)}
        </Text>
      </ItemInfo>
      <Ionicons name="chevron-forward" size={18} color={palette.neutral[300]} />
    </ItemRow>
  );

  if (!onDelete) {
    return row;
  }

  return (
    <ReanimatedSwipeable
      ref={swipeableRef}
      friction={2}
      rightThreshold={ACTION_WIDTH / 2}
      overshootRight={false}
      onSwipeableWillOpen={impactLight}
      renderRightActions={renderRightActions}>
      {row}
    </ReanimatedSwipeable>
  );
}
