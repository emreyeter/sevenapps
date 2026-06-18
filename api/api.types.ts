import type { videos } from './schema';

export type Video = typeof videos.$inferSelect;

export interface CreateVideoInput {
  id: string;
  name: string;
  description: string | null;
  uri: string;
  thumbnailUri: string | null;
  durationMs: number;
  sourceStartSec: number;
}

export interface UpdateVideoMetadataInput {
  id: string;
  name: string;
  description: string | null;
}
