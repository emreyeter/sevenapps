import type { TFunction } from 'i18next';
import { z } from 'zod';

export const NAME_MIN = 1;
export const NAME_MAX = 50;
export const DESCRIPTION_MAX = 300;

export function createVideoMetadataSchema(t: TFunction) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(NAME_MIN, t('validation.nameRequired'))
      .max(NAME_MAX, t('validation.nameMax', { max: NAME_MAX })),
    description: z
      .string()
      .trim()
      .max(DESCRIPTION_MAX, t('validation.descriptionMax', { max: DESCRIPTION_MAX }))
      .optional()
      .or(z.literal('')),
  });
}

export type VideoMetadata = z.infer<ReturnType<typeof createVideoMetadataSchema>>;

export const videoMetadataDefaults: VideoMetadata = {
  name: '',
  description: '',
};
