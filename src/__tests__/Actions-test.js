jest.unmock('../Actions');
jest.unmock('../ActionTypes');
jest.unmock('../ActionTypeSegments');

describe('Actions', () => {
  const namespace = 'Testing';
  const dispatch = () => {};
  const fetch = () => Promise.resolve();

  let Actions;
  let runAction;

  beforeEach(() => {
    Actions = require('../Actions');
    runAction = require('../runAction').default;
  });

  describe('makeCreateAction', () => {
    it('binds the correct params to runAction', () => {
      Actions.makeCreateAction(namespace, dispatch, fetch)();
      expect(runAction.mock.calls[0]).toEqual([
        'TESTING_CREATE_BEGAN',
        'TESTING_CREATE_FAILED',
        'TESTING_CREATE_SUCCEEDED',
        dispatch,
        fetch,
      ]);
    });
  });

  describe('makeReadAction', () => {
    it('binds the correct params to runAction', () => {
      Actions.makeReadAction(namespace, dispatch, fetch)();
      expect(runAction.mock.calls[0]).toEqual([
        'TESTING_READ_BEGAN',
        'TESTING_READ_FAILED',
        'TESTING_READ_SUCCEEDED',
        dispatch,
        fetch,
      ]);
    });
  });

  describe('makeUpdateAction', () => {
    it('binds the correct params to runAction', () => {
      Actions.makeUpdateAction(namespace, dispatch, fetch)();
      expect(runAction.mock.calls[0]).toEqual([
        'TESTING_UPDATE_BEGAN',
        'TESTING_UPDATE_FAILED',
        'TESTING_UPDATE_SUCCEEDED',
        dispatch,
        fetch,
      ]);
    });
  });

  describe('makeDeleteAction', () => {
    it('binds the correct params to runAction', () => {
      Actions.makeDeleteAction(namespace, dispatch, fetch)();
      expect(runAction.mock.calls[0]).toEqual([
        'TESTING_DELETE_BEGAN',
        'TESTING_DELETE_FAILED',
        'TESTING_DELETE_SUCCEEDED',
        dispatch,
        fetch,
      ]);
    });
  });
});
