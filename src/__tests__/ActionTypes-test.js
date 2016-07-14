/* @flow */
jest.unmock('../ActionTypes');
import { joinSegments, normalizeSegment } from '../ActionTypes';
import { check, gen } from 'jest-check';

const nonEmptyString = gen.suchThat(
  (str) => str.trim().length !== 0,
  gen.string
);

describe('ActionTypes', () => {
  describe('joinSegments', () => {
    check.it(
      'converts many strings into actions',
      [gen.array(gen.notEmpty(gen.alphaNumString), 1, 5)],
      (segments) => expect(
        joinSegments(...segments)
      ).toBe(
        segments.join('_').toUpperCase()
      )
    );

    it('converts string arguements to actions', () => {
      expect(joinSegments('one', 'two', 'three')).toBe('ONE_TWO_THREE');
    });
  });

  describe('normalizeSegment', () => {
    check.it(
      'accepts and returns a string',
      [nonEmptyString],
      (str) => expect(typeof normalizeSegment(str)).toBe('string')
    );

    check.it(
      'contains only uppercase letters, numbers, and _s',
      [nonEmptyString],
      (str) => expect(normalizeSegment(str)).toMatch(/^[A-Z0-9_]+$/)
    );

    it('converts to upper case', () => {
      expect(normalizeSegment('omgomgwow')).toBe('OMGOMGWOW');
    });

    it('trims trailing whitespace', () => {
      expect(normalizeSegment('  OMG        ')).toBe('OMG');
    });

    it('replaces whitespace with `_`', () => {
      expect(normalizeSegment('OMG wow')).toBe('OMG_WOW');
      expect(normalizeSegment('OMG         wow')).toBe('OMG_WOW');
    });

    it('replaces special chars with `_`', () => {
      expect(normalizeSegment('OMG!!WOW?. >,*&^_%$#@!OMG')).toBe('OMG_WOW_OMG');
    });
  });
});
