// @flow
import { joinSegments } from './ActionTypeSegments';
import { BEGAN, FAILED, SUCCEEDED } from './constants/Steps';
import { CREATE, READ, UPDATE, DELETE } from './constants/Verbs';

type ActionTypes = {[key: string]: string};

function constants(...keys): ActionTypes {
  const result = {};
  keys.forEach((key) => {
    result[key] = key;
  });
  return result;
}

export function makeVerbActionTypes(
  verb: string,
  namespace: string
): ActionTypes {
  return constants(
    joinSegments(namespace, verb, BEGAN),
    joinSegments(namespace, verb, FAILED),
    joinSegments(namespace, verb, SUCCEEDED)
  );
}

export const makeCreateActionTypes = makeVerbActionTypes.bind(null, CREATE);
export const makeReadActionTypes = makeVerbActionTypes.bind(null, READ);
export const makeUpdateActionTypes = makeVerbActionTypes.bind(null, UPDATE);
export const makeDeleteActionTypes = makeVerbActionTypes.bind(null, DELETE);

export function makeActionTypes(namespace: string): ActionTypes {
  return {
    ...makeCreateActionTypes(namespace),
    ...makeReadActionTypes(namespace),
    ...makeUpdateActionTypes(namespace),
    ...makeDeleteActionTypes(namespace),
  };
}
