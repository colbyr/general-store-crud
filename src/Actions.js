// @flow
import {
  makeCreateActionTypes,
  makeReadActionTypes,
  makeUpdateActionTypes,
  makeDeleteActionTypes,
} from './ActionTypes';
import runAction from './runAction';

import type { Dispatch, Fetch } from './runAction';

export function makeCreateAction(
  namespace: string,
  dispatch: Dispatch,
  fetch: Fetch
) {
  const types = makeCreateActionTypes(namespace);
  const [began, failed, succeeded] = Object.keys(types);
  return runAction.bind(null, began, failed, succeeded, dispatch, fetch);
}

export function makeReadAction(
  namespace: string,
  dispatch: Dispatch,
  fetch: Fetch
) {
  const types = makeReadActionTypes(namespace);
  const [began, failed, succeeded] = Object.keys(types);
  return runAction.bind(null, began, failed, succeeded, dispatch, fetch);
}

export function makeUpdateAction(
  namespace: string,
  dispatch: Dispatch,
  fetch: Fetch
) {
  const types = makeUpdateActionTypes(namespace);
  const [began, failed, succeeded] = Object.keys(types);
  return runAction.bind(null, began, failed, succeeded, dispatch, fetch);
}

export function makeDeleteAction(
  namespace: string,
  dispatch: Dispatch,
  fetch: Fetch
) {
  const types = makeDeleteActionTypes(namespace);
  const [began, failed, succeeded] = Object.keys(types);
  return runAction.bind(null, began, failed, succeeded, dispatch, fetch);
}
