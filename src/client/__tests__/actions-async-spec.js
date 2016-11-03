import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as actions from '../actions';

const mockStore = configureMockStore([thunk])

describe('async actions', () => {

  beforeEach(() => fetchMock.restore());

  it('creates FETCH_EXPENSES_SUCCESS when fetching expenses was done', () => {
    const items = [];
    const pager = {page: 1, pageSize: 10};
    const store = mockStore();

    const expectedActions = [
      {type: actions.FETCH_EXPENSES_START},
      {type: actions.FETCH_EXPENSES_SUCCESS, items: items, pager: pager}
    ];

    fetchMock.get('*', {status: 200, body: {pager, items}});

    return store.dispatch(actions.fetchExpenses()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_EXPENSES_ERROR when fetch expenses failed with 500', () => {
    const store = mockStore();
    const message = 'Server made a boo boo!';
    const expectedActions= [
      {type: actions.FETCH_EXPENSES_START},
      {type: actions.FETCH_EXPENSES_ERROR, message}
    ];

    fetchMock.get('*', {status: 500, body: {message}});

    return store.dispatch(actions.fetchExpenses()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_EXPENSES_ERROR when fetch expenses failed with 400', () => {
    const store = mockStore();
    const message = 'Client was not nice!';
    const expectedActions= [
      {type: actions.FETCH_EXPENSES_START},
      {type: actions.FETCH_EXPENSES_ERROR, message}
    ];

    fetchMock.get('*', {status: 400, body: {message}});

    return store.dispatch(actions.fetchExpenses()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

});
