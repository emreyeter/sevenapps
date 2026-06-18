import { desc, eq } from 'drizzle-orm';

import { db } from './client';
import { videos } from './schema';
import type {
  CreateVideoInput,
  UpdateVideoMetadataInput,
  Video,
} from './api.types';

export const videosApi = {
  list(): Promise<Video[]> {
    return db.select().from(videos).orderBy(desc(videos.createdAt));
  },

  async getById(id: string): Promise<Video | null> {
    const rows = await db
      .select()
      .from(videos)
      .where(eq(videos.id, id))
      .limit(1);
    return rows[0] ?? null;
  },

  async create(input: CreateVideoInput): Promise<Video> {
    const now = Date.now();
    const row: Video = { ...input, createdAt: now, updatedAt: now };
    await db.insert(videos).values(row);
    return row;
  },

  async updateMetadata({
    id,
    name,
    description,
  }: UpdateVideoMetadataInput): Promise<void> {
    await db
      .update(videos)
      .set({ name, description, updatedAt: Date.now() })
      .where(eq(videos.id, id));
  },

  async remove(id: string): Promise<void> {
    await db.delete(videos).where(eq(videos.id, id));
  },
};

export const api = {
  videos: videosApi,
};
