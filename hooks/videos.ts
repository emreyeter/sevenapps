import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api';
import { videoQueryKeys } from '@/api/queryKeys';
import type {
  CreateVideoInput,
  UpdateVideoMetadataInput,
  Video,
} from '@/api/api.types';
import { deleteVideoAssets } from '@/lib/fs/videoStorage';

export function useVideos() {
  return useQuery({
    queryKey: videoQueryKeys.list(),
    queryFn: () => api.videos.list(),
  });
}

export function useVideo(id: string | undefined) {
  return useQuery({
    queryKey: videoQueryKeys.detail(id ?? ''),
    queryFn: () => api.videos.getById(id as string),
    enabled: Boolean(id),
  });
}

export function useCreateVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateVideoInput) => api.videos.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: videoQueryKeys.list() });
    },
  });
}

export function useUpdateVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateVideoMetadataInput) =>
      api.videos.updateMetadata(input),
    onMutate: async (input) => {
      const detailKey = videoQueryKeys.detail(input.id);
      await queryClient.cancelQueries({ queryKey: detailKey });
      const previous = queryClient.getQueryData<Video | null>(detailKey);
      if (previous) {
        queryClient.setQueryData<Video>(detailKey, {
          ...previous,
          name: input.name,
          description: input.description,
          updatedAt: Date.now(),
        });
      }
      return { previous, detailKey };
    },
    onError: (_error, _input, context) => {
      if (context?.previous) {
        queryClient.setQueryData(context.detailKey, context.previous);
      }
    },
    onSettled: (_data, _error, input) => {
      queryClient.invalidateQueries({ queryKey: videoQueryKeys.detail(input.id) });
      queryClient.invalidateQueries({ queryKey: videoQueryKeys.list() });
    },
  });
}

export function useDeleteVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (video: Video) => {
      await api.videos.remove(video.id);
      deleteVideoAssets(video.uri, video.thumbnailUri);
    },
    onSuccess: (_data, video) => {
      queryClient.removeQueries({ queryKey: videoQueryKeys.detail(video.id) });
      queryClient.invalidateQueries({ queryKey: videoQueryKeys.list() });
    },
  });
}
