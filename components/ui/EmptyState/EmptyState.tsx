import { Ionicons } from '@expo/vector-icons';

import { useThemeColors } from '@/hooks/theme';
import type { TxKey } from '@/i18n/types';
import { Button } from '../Button';
import { Text } from '../Text';
import { EmptyContainer, IconCircle, TextGroup } from './EmptyState.styles';

export type EmptyStateProps = {
  icon: keyof typeof Ionicons.glyphMap;
  titleTx: TxKey;
  descriptionTx?: TxKey;
  descriptionValues?: Record<string, string | number>;
  actionTx?: TxKey;
  onAction?: () => void;
};

export function EmptyState({
  icon,
  titleTx,
  descriptionTx,
  descriptionValues,
  actionTx,
  onAction,
}: EmptyStateProps) {
  const { colors } = useThemeColors();

  return (
    <EmptyContainer>
      <IconCircle>
        <Ionicons name={icon} size={30} color={colors.textMuted} />
      </IconCircle>
      <TextGroup>
        <Text variant="subtitle" tx={titleTx} className="text-center" />
        {descriptionTx ? (
          <Text
            tone="muted"
            tx={descriptionTx}
            txValues={descriptionValues}
            className="text-center"
          />
        ) : null}
      </TextGroup>
      {actionTx && onAction ? (
        <Button tx={actionTx} onPress={onAction} fullWidth={false} />
      ) : null}
    </EmptyContainer>
  );
}
