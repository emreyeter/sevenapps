import { videoQueryKeys } from '@/api/queryKeys';

describe('videoQueryKeys', () => {
  it('builds a stable list key', () => {
    expect(videoQueryKeys.list()).toEqual(['videos', 'list']);
  });

  it('builds a detail key scoped to an id', () => {
    expect(videoQueryKeys.detail('abc')).toEqual(['videos', 'detail', 'abc']);
  });

  it('shares the same root for invalidation', () => {
    expect(videoQueryKeys.all[0]).toBe(videoQueryKeys.list()[0]);
    expect(videoQueryKeys.all[0]).toBe(videoQueryKeys.detail('x')[0]);
  });
});
