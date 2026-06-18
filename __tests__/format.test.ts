import {
  formatDurationMs,
  formatTimecode,
} from '@/lib/format';

describe('formatTimecode', () => {
  it('formats seconds as m:ss', () => {
    expect(formatTimecode(0)).toBe('0:00');
    expect(formatTimecode(5)).toBe('0:05');
    expect(formatTimecode(65)).toBe('1:05');
    expect(formatTimecode(600)).toBe('10:00');
  });

  it('clamps negative values to zero', () => {
    expect(formatTimecode(-10)).toBe('0:00');
  });

  it('floors fractional seconds', () => {
    expect(formatTimecode(5.9)).toBe('0:05');
  });
});

describe('formatDurationMs', () => {
  it('converts milliseconds to timecode', () => {
    expect(formatDurationMs(5000)).toBe('0:05');
    expect(formatDurationMs(125000)).toBe('2:05');
  });
});
