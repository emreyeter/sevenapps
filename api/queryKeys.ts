const ROOT = 'videos';

const SCOPES = {
  list: 'list',
  detail: 'detail',
} as const;

export const videoQueryKeys = {
  all: [ROOT] as const,
  list: () => [ROOT, SCOPES.list] as const,
  detail: (id: string) => [ROOT, SCOPES.detail, id] as const,
};

export type VideoListKey = ReturnType<typeof videoQueryKeys.list>;
export type VideoDetailKey = ReturnType<typeof videoQueryKeys.detail>;
