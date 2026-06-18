import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';
import { trimVideo } from 'expo-trim-video';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { useCallback, useState } from 'react';

import { api } from '@/api/api';
import type { Video } from '@/api/api.types';
import { videoQueryKeys } from '@/api/queryKeys';
import { persistThumbnailFile, persistVideoFile } from '@/lib/fs/videoStorage';
import { createId } from '@/lib/id';

export type PickedVideo = {
  uri: string;
  durationSec: number;
};

type PickResult =
  | { status: 'success'; video: PickedVideo }
  | { status: 'canceled' }
  | { status: 'denied' };

export function usePickVideo() {
  const [isPicking, setIsPicking] = useState(false);

  const pick = useCallback(async (): Promise<PickResult> => {
    setIsPicking(true);
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        return { status: 'denied' };
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['videos'],
        allowsMultipleSelection: false,
        quality: 1,
      });

      if (result.canceled || !result.assets?.[0]) {
        return { status: 'canceled' };
      }

      const asset = result.assets[0];
      const durationSec = asset.duration ? asset.duration / 1000 : 0;
      return { status: 'success', video: { uri: asset.uri, durationSec } };
    } finally {
      setIsPicking(false);
    }
  }, []);

  return { pick, isPicking };
}

export type TrimVideoParams = {
  sourceUri: string;
  startSec: number;
  segmentSec: number;
  name: string;
  description: string;
};

async function generateThumbnail(videoUri: string, id: string): Promise<string | null> {
  try {
    const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri, {
      time: 0,
      quality: 0.7,
    });
    return persistThumbnailFile(uri, id);
  } catch {
    return null;
  }
}

export function useTrimVideo() {
  const queryClient = useQueryClient();

  return useMutation<Video, Error, TrimVideoParams>({
    mutationFn: async ({ sourceUri, startSec, segmentSec, name, description }) => {
      const id = createId();
      const start = Math.max(0, startSec);
      const end = start + segmentSec;

      const { uri: trimmedUri } = await trimVideo({ uri: sourceUri, start, end });

      const persistedUri = persistVideoFile(trimmedUri, id);
      const thumbnailUri = await generateThumbnail(persistedUri, id);

      return api.videos.create({
        id,
        name: name.trim(),
        description: description.trim() ? description.trim() : null,
        uri: persistedUri,
        thumbnailUri,
        durationMs: Math.round(segmentSec * 1000),
        sourceStartSec: start,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: videoQueryKeys.list() });
    },
  });
}
