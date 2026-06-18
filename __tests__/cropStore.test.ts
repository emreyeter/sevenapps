import { SEGMENT_DURATION_SEC } from '@/constants/video';
import { useCropStore } from '@/store/cropStore';

describe('cropStore', () => {
  beforeEach(() => {
    useCropStore.getState().reset();
  });

  it('sets the source and caps the segment to the video length', () => {
    useCropStore.getState().setSource('file://clip.mp4', 3);
    const state = useCropStore.getState();
    expect(state.sourceUri).toBe('file://clip.mp4');
    expect(state.durationSec).toBe(3);
    expect(state.segmentSec).toBe(3);
  });

  it('uses the default segment for long videos', () => {
    useCropStore.getState().setSource('file://clip.mp4', 60);
    expect(useCropStore.getState().segmentSec).toBe(SEGMENT_DURATION_SEC);
  });

  it('clamps start within the trimmable range', () => {
    useCropStore.getState().setSource('file://clip.mp4', 10);
    useCropStore.getState().setStart(100);
    expect(useCropStore.getState().startSec).toBe(10 - SEGMENT_DURATION_SEC);

    useCropStore.getState().setStart(-5);
    expect(useCropStore.getState().startSec).toBe(0);
  });

  it('resets back to the initial state', () => {
    useCropStore.getState().setSource('file://clip.mp4', 10);
    useCropStore.getState().reset();
    expect(useCropStore.getState().sourceUri).toBeNull();
    expect(useCropStore.getState().startSec).toBe(0);
  });
});
