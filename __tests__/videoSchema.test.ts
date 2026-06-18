import type { TFunction } from 'i18next';

import { createVideoMetadataSchema, NAME_MAX } from '@/lib/validation/videoSchema';

const t = ((key: string) => key) as unknown as TFunction;
const schema = createVideoMetadataSchema(t);

describe('videoMetadataSchema', () => {
  it('rejects an empty name', () => {
    const result = schema.safeParse({ name: '', description: '' });
    expect(result.success).toBe(false);
  });

  it('rejects a name longer than the limit', () => {
    const result = schema.safeParse({
      name: 'a'.repeat(NAME_MAX + 1),
      description: '',
    });
    expect(result.success).toBe(false);
  });

  it('accepts a valid name with an empty description', () => {
    const result = schema.safeParse({ name: 'Morning run', description: '' });
    expect(result.success).toBe(true);
  });

  it('trims whitespace around the name', () => {
    const result = schema.safeParse({ name: '  hello  ', description: '' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe('hello');
    }
  });
});
