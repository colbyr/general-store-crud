// @flow
import invariant from 'invariant';

export const RESTRICTED_CHARACTERS = /([^a-zA-Z0-9])+/g;

export function normalizeSegment(str: string): string {
  const trimmed = str.trim();
  invariant(
    trimmed.length > 0,
    'expect `str` to be a non-empty `string` but got `%s`',
    str
  );
  return trimmed.replace(RESTRICTED_CHARACTERS, '_').toUpperCase();
}

export function joinSegments(...segments: Array<string>): string {
  return segments.map(normalizeSegment).join('_');
}
