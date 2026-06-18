import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';

import type { Video } from '@/api/api.types';
import {
  Button,
  Center,
  Column,
  EmptyState,
  IconButton,
  Screen,
  Spinner,
  Text,
  useToast,
} from '@/components/ui';
import { VideoPlayer } from '@/components/video';
import { palette } from '@/constants/tokens';
import { useDeleteVideo, useVideo } from '@/hooks/videos';
import { formatRelativeDate } from '@/lib/format';

export default function VideoDetailsScreen() {
  const router = useRouter();
  const toast = useToast();
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: video, isLoading } = useVideo(id);
  const deleteVideo = useDeleteVideo();

  const back = { onBack: () => router.back(), backLabel: t('common.back') };

  const confirmDelete = useCallback(
    (target: Video) => {
      Alert.alert(
        t('library.deleteTitle'),
        t('library.deleteMessage', { name: target.name }),
        [
          { text: t('common.cancel'), style: 'cancel' },
          {
            text: t('common.delete'),
            style: 'destructive',
            onPress: () => {
              deleteVideo.mutate(target, {
                onSuccess: () => {
                  toast.success(t('library.deleteSuccess'));
                  router.back();
                },
                onError: () => toast.error(t('library.deleteError')),
              });
            },
          },
        ],
      );
    },
    [deleteVideo, router, t, toast],
  );

  if (isLoading) {
    return (
      <Screen header={back}>
        <Center>
          <Spinner size="large" />
        </Center>
      </Screen>
    );
  }

  if (!video) {
    return (
      <Screen header={back}>
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
    <Screen
      header={{
        ...back,
        title: video.name,
        right: (
          <IconButton
            icon="create-outline"
            accessibilityLabel={t('details.editA11y')}
            onPress={() => router.push(`/video/${video.id}/edit`)}
          />
        ),
      }}>
      <Column className="gap-5 py-4">
        <VideoPlayer uri={video.uri} autoPlay loop />

        <Column className="gap-1">
          <Text variant="title">{video.name}</Text>
          <Text variant="caption" tone="muted">
            {formatRelativeDate(video.createdAt)}
          </Text>
        </Column>

        {video.description ? (
          <Text className="leading-6">{video.description}</Text>
        ) : (
          <Text tone="muted" tx="details.noDescription" />
        )}

        <Button
          tx="common.delete"
          variant="danger"
          loading={deleteVideo.isPending}
          onPress={() => confirmDelete(video)}
          leftSlot={
            <Ionicons
              name="trash-outline"
              size={18}
              color={palette.neutral[0]}
            />
          }
          className="mt-2"
          style={{ backgroundColor: palette.danger }}
        />
      </Column>
    </Screen>
  );
}
