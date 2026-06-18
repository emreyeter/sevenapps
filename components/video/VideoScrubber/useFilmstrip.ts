import * as VideoThumbnails from 'expo-video-thumbnails';
import { useEffect, useState } from 'react';

import { FILMSTRIP_FRAME_COUNT } from '@/constants/video';

export type FilmstripFrame = {
  uri: string;
  atSec: number;
};

type FilmstripState = {
  frames: FilmstripFrame[];
  isLoading: boolean;
};

export function useFilmstrip(
  sourceUri: string | null,
  durationSec: number,
  frameCount: number = FILMSTRIP_FRAME_COUNT,
): FilmstripState {
  const [state, setState] = useState<FilmstripState>({
    frames: [],
    isLoading: true,
  });

  useEffect(() => {
    let cancelled = false;

    async function generate() {
      if (!sourceUri || durationSec <= 0) {
        setState({ frames: [], isLoading: false });
        return;
      }

      setState({ frames: [], isLoading: true });
      const accumulated: FilmstripFrame[] = [];

      for (let index = 0; index < frameCount; index += 1) {
        const atSec = (durationSec * index) / frameCount;
        try {
          const { uri } = await VideoThumbnails.getThumbnailAsync(sourceUri, {
            time: Math.floor(atSec * 1000),
            quality: 0.4,
          });
          if (cancelled) return;
          accumulated.push({ uri, atSec });
          setState({ frames: [...accumulated], isLoading: true });
        } catch {
          if (cancelled) return;
        }
      }

      if (!cancelled) {
        setState({ frames: accumulated, isLoading: false });
      }
    }

    generate();

    return () => {
      cancelled = true;
    };
  }, [sourceUri, durationSec, frameCount]);

  return state;
}
