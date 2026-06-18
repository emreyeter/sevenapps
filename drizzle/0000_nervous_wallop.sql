CREATE TABLE `videos` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`uri` text NOT NULL,
	`thumbnail_uri` text,
	`duration_ms` integer NOT NULL,
	`source_start_sec` real NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
