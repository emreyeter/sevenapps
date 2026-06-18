import { create } from 'zustand';

import { SEGMENT_DURATION_SEC } from '@/constants/video';

type CropState = {
  sourceUri: string | null;
  durationSec: number;
  startSec: number;
  segmentSec: number;
  name: string;
  description: string;
  setSource: (uri: string, durationSec: number) => void;
  setStart: (startSec: number) => void;
  setMetadata: (metadata: { name: string; description: string }) => void;
  reset: () => void;
};

const initialState = {
  sourceUri: null as string | null,
  durationSec: 0,
  startSec: 0,
  segmentSec: SEGMENT_DURATION_SEC,
  name: '',
  description: '',
};

function clampStart(startSec: number, durationSec: number, segmentSec: number): number {
  const maxStart = Math.max(0, durationSec - segmentSec);
  return Math.min(Math.max(startSec, 0), maxStart);
}

export const useCropStore = create<CropState>((set) => ({
  ...initialState,
  setSource: (uri, durationSec) =>
    set(() => {
      const segmentSec = Math.min(SEGMENT_DURATION_SEC, durationSec || SEGMENT_DURATION_SEC);
      return {
        sourceUri: uri,
        durationSec,
        segmentSec,
        startSec: 0,
        name: '',
        description: '',
      };
    }),
  setStart: (startSec) =>
    set((state) => ({
      startSec: clampStart(startSec, state.durationSec, state.segmentSec),
    })),
  setMetadata: ({ name, description }) => set(() => ({ name, description })),
  reset: () => set(() => ({ ...initialState })),
}));
