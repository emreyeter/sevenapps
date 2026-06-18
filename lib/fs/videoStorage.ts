import { Directory, File, Paths } from 'expo-file-system';

const VIDEOS_DIR = 'videos';
const THUMBS_DIR = 'thumbnails';

function ensureDirectory(name: string): Directory {
  const dir = new Directory(Paths.document, name);
  if (!dir.exists) {
    dir.create({ intermediates: true });
  }
  return dir;
}

function safeDelete(uri: string | null | undefined): void {
  if (!uri) return;
  try {
    const file = new File(uri);
    if (file.exists) {
      file.delete();
    }
  } catch {
    // Ignore: file may already be gone or be a remote URI.
  }
}

export function persistVideoFile(sourceUri: string, id: string): string {
  const dir = ensureDirectory(VIDEOS_DIR);
  const source = new File(sourceUri);
  const destination = new File(dir, `${id}.mp4`);

  if (destination.exists) {
    destination.delete();
  }
  source.copy(destination);
  safeDelete(sourceUri);

  return destination.uri;
}

export function persistThumbnailFile(sourceUri: string, id: string): string {
  const dir = ensureDirectory(THUMBS_DIR);
  const source = new File(sourceUri);
  const destination = new File(dir, `${id}.jpg`);

  if (destination.exists) {
    destination.delete();
  }
  source.copy(destination);
  safeDelete(sourceUri);

  return destination.uri;
}

export function deleteVideoAssets(videoUri: string, thumbnailUri: string | null): void {
  safeDelete(videoUri);
  safeDelete(thumbnailUri);
}
