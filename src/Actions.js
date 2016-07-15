// @flow
import {
  makeCreateActionTypes,
  makeReadActionTypes,
  makeUpdateActionTypes,
  makeDeleteActionTypes,
} from './ActionTypes';

type Fetch = (ids: Array<string | number>) => Promise<any>;
type Dispatch = (actionType: string, data: any) => void;

export function runAction(
  beganActionType: string,
  failedActionType: string,
  succeededActionType: string,
  dispatch: Dispatch,
  fetch: Fetch,
  params: any,
): Promise<any> {
  dispatch(beganActionType, {params});
  return fetch(params)
    .then((result) => {
      dispatch(succeededActionType, {params, result});
      return result;
    })
    .catch((error) => dispatch(failedActionType, {params, error}));
}

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
