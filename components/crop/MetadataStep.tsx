import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, View } from 'react-native';

import { MetadataForm, type MetadataFormValues } from '@/components/form';
import { Card, Column, ProgressBar, Screen, Spinner, Text, useToast } from '@/components/ui';
import { palette } from '@/constants/tokens';
import { useTrimVideo } from '@/hooks/crop';
import { formatTimecode } from '@/lib/format';
import { notifyError, notifySuccess } from '@/lib/haptics';
import { getTrimErrorMessage } from '@/lib/trimErrors';
import { useCropStore } from '@/store/cropStore';

type CropPhase = 'idle' | 'processing' | 'success';

const SUCCESS_HOLD_MS = 1100;

export function MetadataStep() {
  const router = useRouter();
  const toast = useToast();
  const { t } = useTranslation();
  const trim = useTrimVideo();
  const [phase, setPhase] = useState<CropPhase>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sourceUri = useCropStore((state) => state.sourceUri);
  const startSec = useCropStore((state) => state.startSec);
  const segmentSec = useCropStore((state) => state.segmentSec);
  const reset = useCropStore((state) => state.reset);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const handleSubmit = useCallback(
    (values: MetadataFormValues) => {
      if (!sourceUri) return;
      setPhase('processing');
      trim.mutate(
        {
          sourceUri,
          startSec,
          segmentSec,
          name: values.name,
          description: values.description,
        },
        {
          onSuccess: (video) => {
            notifySuccess();
            setPhase('success');
            timerRef.current = setTimeout(() => {
              reset();
              router.dismissAll();
              router.push(`/video/${video.id}`);
            }, SUCCESS_HOLD_MS);
          },
          onError: (error) => {
            notifyError();
            setPhase('idle');
            toast.error(t('crop.failedTitle'), getTrimErrorMessage(error));
          },
        },
      );
    },
    [reset, router, segmentSec, sourceUri, startSec, t, toast, trim],
  );

  if (!sourceUri) {
    return null;
  }

  const busy = phase !== 'idle';

  return (
    <Screen safeArea={false} keyboardAvoiding>
      <Column className="gap-4 pb-6 pt-2">
        <Card className="flex-row items-center gap-3 p-4">
          <View className="h-10 w-10 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/40">
            <Ionicons name="cut-outline" size={20} color={palette.primary.DEFAULT} />
          </View>
          <Column className="gap-0.5">
            <Text variant="label" tx="crop.selectedSegment" />
            <Text variant="caption" tone="muted">
              {formatTimecode(startSec)} – {formatTimecode(startSec + segmentSec)} (
              {Math.round(segmentSec)}s)
            </Text>
          </Column>
        </Card>

        <MetadataForm
          submitTx="crop.submit"
          onSubmit={handleSubmit}
          isSubmitting={busy}
        />
      </Column>

      <Modal visible={busy} transparent animationType="fade">
        <View className="flex-1 items-center justify-center bg-black/50 px-8">
          <Card className="w-full items-center gap-4 p-7">
            {phase === 'success' ? (
              <>
                <View className="h-20 w-20 items-center justify-center rounded-full bg-success/15">
                  <Ionicons name="checkmark-circle" size={64} color={palette.success} />
                </View>
                <Text variant="subtitle" tx="crop.saved" />
              </>
            ) : (
              <>
                <Spinner />
                <View className="items-center gap-1">
                  <Text variant="subtitle" tx="crop.croppingTitle" />
                  <Text variant="caption" tone="muted" tx="crop.croppingHint" />
                </View>
                <ProgressBar indeterminate className="mt-1 w-full" />
              </>
            )}
          </Card>
        </View>
      </Modal>
    </Screen>
  );
}
