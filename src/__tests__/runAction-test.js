// @flow
jest.unmock('../runAction');

import runAction from '../runAction';

describe('runAction', () => {
  const mockBegan = 'TEST_FETCH_BEGAN';
  const mockFailed = 'TEST_FETCH_FAILED';
  const mockSucceeded = 'TEST_FETCH_SUCCEEDED';

  let mockDispatch;
  let mockFetch;
  let mockFetchPromise;
  let mockParams;
  let mockRun;
  let rejectFetch;
  let resolveFetch;

  beforeEach(() => {
    mockDispatch = jest.fn();
    mockFetchPromise = new Promise((resolve, reject) => {
      rejectFetch = reject;
      resolveFetch = resolve;
    });
    mockFetch = jest.fn(() => mockFetchPromise);
    mockParams = {testing: 123};
    mockRun = runAction.bind(
      null,
      mockBegan,
      mockFailed,
      mockSucceeded,
      mockDispatch,
      mockFetch,
    );
  });

  it('dispatches began immediately', () => {
    mockRun(mockParams);
    expect(mockDispatch.mock.calls[0]).toEqual([
      mockBegan,
      {params: mockParams},
    ]);
  });

  it('calls fetch with the params', () => {
    mockRun(mockParams);
    expect(mockFetch.mock.calls[0]).toEqual([mockParams]);
  });

  it('dispatches succeeded when fetch resolves', () => {
    const mockResult = {omg: 'yay'};
    const resultPromise = mockRun(mockParams);
    resolveFetch(mockResult);
    return resultPromise.then(() => {
      expect(mockDispatch.mock.calls[1]).toEqual([
        mockSucceeded,
        {params: mockParams, result: mockResult}
      ]);
    });
  });

  it('dispatches failed when fetch rejects', () => {
    const mockError = new Error();
    const resultPromise = mockRun(mockParams);
    rejectFetch(mockError);
    return resultPromise.catch(() => {
      expect(mockDispatch.mock.calls[1]).toEqual([
        mockFailed,
        {params: mockParams, error: mockError}
      ]);
    });
  });
});
