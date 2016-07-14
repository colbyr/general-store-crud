// @flow
jest.unmock('../ActionTypes');
jest.unmock('../ActionTypeSegments');

import { makeActionTypes } from '../ActionTypes';
import { joinSegments } from '../ActionTypeSegments';
import { BEGAN, FAILED, SUCCEEDED } from '../constants/Steps';
import { CREATE, READ, UPDATE, DELETE } from '../constants/Verbs';

describe('ActionTypes', () => {
  describe('makeActionType', () => {
    it('creates an actionType for each verb and step', () => {
      const ns = 'testing';
      const testTypes = makeActionTypes(ns);
      [CREATE, READ, UPDATE, DELETE].forEach((verb) => {
        [BEGAN, FAILED, SUCCEEDED].forEach((step) => {
          const type = joinSegments(ns, verb, step);
          expect(testTypes[type]).toEqual(type);
        });
      });
    });
  });
});
