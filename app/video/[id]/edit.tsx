import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { MetadataForm, type MetadataFormValues } from '@/components/form';
import { Center, Column, EmptyState, Screen, Spinner, useToast } from '@/components/ui';
import { useUpdateVideo, useVideo } from '@/hooks/videos';

export default function EditVideoScreen() {
  const router = useRouter();
  const toast = useToast();
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: video, isLoading } = useVideo(id);
  const updateVideo = useUpdateVideo();

  const handleSubmit = useCallback(
    (values: MetadataFormValues) => {
      if (!video) return;
      updateVideo.mutate(
        {
          id: video.id,
          name: values.name,
          description: values.description ? values.description : null,
        },
        {
          onSuccess: () => {
            toast.success(t('edit.saved'));
            router.back();
          },
          onError: () => toast.error(t('edit.error')),
        },
      );
    },
    [router, t, toast, updateVideo, video],
  );

  const header = {
    titleTx: 'edit.title' as const,
    onBack: () => router.back(),
    backIcon: 'close' as const,
    backLabel: t('common.close'),
  };

  if (isLoading) {
    return (
      <Screen header={header}>
        <Center>
          <Spinner size="large" />
        </Center>
      </Screen>
    );
  }

  if (!video) {
    return (
      <Screen header={header}>
        <EmptyState
          icon="alert-circle-outline"
          titleTx="details.notFoundTitle"
          descriptionTx="details.notFoundDescription"
          actionTx="details.backToLibrary"
          onAction={() => router.back()}
        />
      </Screen>
    );
  }

  return (
    <Screen keyboardAvoiding header={header}>
      <Column className="py-4">
        <MetadataForm
          defaultValues={{
            name: video.name,
            description: video.description ?? '',
          }}
          submitTx="edit.submit"
          onSubmit={handleSubmit}
          isSubmitting={updateVideo.isPending}
        />
      </Column>
    </Screen>
  );
}
