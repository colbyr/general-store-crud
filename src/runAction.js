// @flow
export type Fetch = (params: any) => Promise<any>;
export type Dispatch = (actionType: string, data: any) => void;

export default function runAction(
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
    .catch((error) => {
      dispatch(failedActionType, {params, error});
      throw error;
    });
}
