import i18n from '@/i18n';
import type { TxKey } from '@/i18n/types';

const KNOWN_CODES = [
  'INVALID_ARGUMENTS',
  'INVALID_START',
  'INVALID_END',
  'INVALID_RANGE',
  'INVALID_URI',
  'FILE_NOT_FOUND',
  'TRIM_ERROR',
] as const;

export function getTrimErrorMessage(error: unknown): string {
  const code = (error as { code?: string } | null)?.code;
  const key: TxKey =
    code && (KNOWN_CODES as readonly string[]).includes(code)
      ? (`trimErrors.${code}` as TxKey)
      : 'trimErrors.UNKNOWN';
  return i18n.t(key);
}
