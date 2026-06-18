import { Ionicons } from '@expo/vector-icons';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { Button, Screen, Text, useToast } from '@/components/ui';
import { palette } from '@/constants/tokens';
import { SEGMENT_DURATION_SEC } from '@/constants/video';
import { usePickVideo } from '@/hooks/crop';
import { useThemeColors } from '@/hooks/theme';
import { useCropStore } from '@/store/cropStore';

export type SelectStepProps = {
  onNext: () => void;
};

export function SelectStep({ onNext }: SelectStepProps) {
  const toast = useToast();
  const { t } = useTranslation();
  const { colors } = useThemeColors();
  const { pick, isPicking } = usePickVideo();
  const setSource = useCropStore((state) => state.setSource);

  const handlePick = useCallback(async () => {
    const result = await pick();
    if (result.status === 'denied') {
      toast.error(t('crop.permissionTitle'), t('crop.permissionMessage'));
      return;
    }
    if (result.status === 'canceled') {
      return;
    }
    setSource(result.video.uri, result.video.durationSec);
    onNext();
  }, [onNext, pick, setSource, t, toast]);

  return (
    <Screen
      safeArea={false}
      footer={
        <Button
          tx="crop.selectButton"
          loading={isPicking}
          onPress={handlePick}
          leftSlot={
            <Ionicons name="images-outline" size={20} color={palette.neutral[0]} />
          }
        />
      }>
      <View className="flex-1 items-center justify-center gap-6">
        <View className="h-28 w-28 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/40">
          <Ionicons name="cloud-upload-outline" size={52} color={colors.primary} />
        </View>
        <View className="items-center gap-1 px-6">
          <Text variant="subtitle" tx="crop.selectHeading" />
          <Text
            tone="muted"
            className="text-center"
            tx="crop.selectHint"
            txValues={{ seconds: SEGMENT_DURATION_SEC }}
          />
        </View>
      </View>
    </Screen>
  );
}
