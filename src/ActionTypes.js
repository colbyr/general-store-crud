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

export function makeActionTypes(namespace: string): ActionTypes {
  return constants(
    joinSegments(namespace, CREATE, BEGAN),
    joinSegments(namespace, CREATE, FAILED),
    joinSegments(namespace, CREATE, SUCCEEDED),
    joinSegments(namespace, READ, BEGAN),
    joinSegments(namespace, READ, FAILED),
    joinSegments(namespace, READ, SUCCEEDED),
    joinSegments(namespace, UPDATE, BEGAN),
    joinSegments(namespace, UPDATE, FAILED),
    joinSegments(namespace, UPDATE, SUCCEEDED),
    joinSegments(namespace, DELETE, BEGAN),
    joinSegments(namespace, DELETE, FAILED),
    joinSegments(namespace, DELETE, SUCCEEDED),
  );
}
