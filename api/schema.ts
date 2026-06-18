import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const videos = sqliteTable('videos', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  uri: text('uri').notNull(),
  thumbnailUri: text('thumbnail_uri'),
  durationMs: integer('duration_ms').notNull(),
  sourceStartSec: real('source_start_sec').notNull(),
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
});
