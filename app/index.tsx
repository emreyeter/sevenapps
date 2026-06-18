import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Pressable } from 'react-native';

import type { Video } from '@/api/api.types';
import { Center, EmptyState, SafeArea, Spinner, Text } from '@/components/ui';
import { VideoListItem } from '@/components/video';
import { palette } from '@/constants/tokens';
import { SEGMENT_DURATION_SEC } from '@/constants/video';
import { useVideos } from '@/hooks/videos';

const fabShadow = {
  shadowColor: '#000',
  shadowOpacity: 0.18,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 5 },
  elevation: 8,
};

export default function LibraryScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { data: videos, isLoading, isError, refetch, isRefetching } = useVideos();

  const openCrop = useCallback(() => {
    router.push('/(crop)');
  }, [router]);

  const openDetails = useCallback(
    (video: Video) => {
      router.push(`/video/${video.id}`);
    },
    [router],
  );

  return (
    <SafeArea edges={['bottom']}>
      {isLoading ? (
        <Center>
          <Spinner size="large" />
        </Center>
      ) : isError ? (
        <EmptyState
          icon="alert-circle-outline"
          titleTx="library.errorTitle"
          descriptionTx="library.errorDescription"
          actionTx="common.tryAgain"
          onAction={refetch}
        />
      ) : (
        <FlatList
          data={videos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <VideoListItem video={item} onPress={openDetails} />
          )}
          contentContainerClassName="grow gap-3 px-5 pb-28 pt-3"
          showsVerticalScrollIndicator={false}
          onRefresh={refetch}
          refreshing={isRefetching}
          ListHeaderComponent={
            videos && videos.length > 0 ? (
              <Text
                variant="caption"
                tone="muted"
                className="mb-2 px-1 uppercase tracking-wide"
                tx="library.count"
                txValues={{ count: videos.length }}
              />
            ) : null
          }
          ListEmptyComponent={
            <EmptyState
              icon="videocam-outline"
              titleTx="library.emptyTitle"
              descriptionTx="library.emptyDescription"
              descriptionValues={{ seconds: SEGMENT_DURATION_SEC }}
              actionTx="library.emptyAction"
              onAction={openCrop}
            />
          }
        />
      )}

      <Pressable
        onPress={openCrop}
        accessibilityRole="button"
        accessibilityLabel={t('library.addA11y')}
        style={fabShadow}
        className="absolute bottom-6 right-5 h-14 w-14 items-center justify-center rounded-full bg-primary-600 active:bg-primary-700">
        <Ionicons name="add" size={30} color={palette.neutral[0]} />
      </Pressable>
    </SafeArea>
  );
}
