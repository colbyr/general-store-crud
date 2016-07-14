/* @flow */
jest.unmock('../ActionTypes');
import { joinSegments, normalizeSegment } from '../ActionTypes';
import { check, gen } from 'jest-check';

describe('ActionTypes', () => {
  describe('joinSegments', () => {
    it('converts string arguements to actions', () => {
      expect(joinSegments('one', 'two', 'three')).toBe('ONE_TWO_THREE');
    });
  });

  describe('normalizeSegment', () => {
    check.it('accepts and returns a string', [gen.notEmpty(gen.string)], (str) => {
      expect(typeof normalizeSegment(str)).toBe('string');
    });

    check.it('never contains lowercase letters', [gen.notEmpty(gen.string)], (str) => {
      expect(normalizeSegment(str)).toMatch(/[^a-z]/);
    });

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
