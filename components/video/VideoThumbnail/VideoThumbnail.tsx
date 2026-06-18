import { Ionicons } from '@expo/vector-icons';

import { useThemeColors } from '@/hooks/theme';
import { palette } from '@/constants/tokens';
import { formatDurationMs } from '@/lib/format';
import {
  DurationBadge,
  DurationLabel,
  PlayBadge,
  PlayOverlay,
  ThumbImage,
  ThumbWrapper,
} from './VideoThumbnail.styles';

export type VideoThumbnailProps = {
  thumbnailUri?: string | null;
  durationMs?: number;
  className?: string;
  iconSize?: number;
};

export function VideoThumbnail({
  thumbnailUri,
  durationMs,
  className,
  iconSize = 22,
}: VideoThumbnailProps) {
  const { colors } = useThemeColors();

  return (
    <ThumbWrapper className={className}>
      {thumbnailUri ? (
        <ThumbImage source={{ uri: thumbnailUri }} contentFit="cover" transition={150} />
      ) : (
        <Ionicons name="film-outline" size={iconSize * 1.4} color={colors.icon} />
      )}

      <PlayOverlay>
        <PlayBadge>
          <Ionicons name="play" size={iconSize} color={palette.neutral[0]} />
        </PlayBadge>
      </PlayOverlay>

      {typeof durationMs === 'number' ? (
        <DurationBadge>
          <DurationLabel>{formatDurationMs(durationMs)}</DurationLabel>
        </DurationBadge>
      ) : null}
    </ThumbWrapper>
  );
}
