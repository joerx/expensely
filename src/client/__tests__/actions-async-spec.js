import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
// import nock from 'nock';

import * as actions from '../actions';

const mockStore = configureMockStore([thunk])

describe('async actions', () => {

  // afterEach(() => nock.cleanAll());
  afterEach(() => fetchMock.reset());

  it('creates FETCH_EXPENSES_SUCCESS when fetching expenses was done', () => {
    const items = [];
    const pager = {page: 1, pageSize: 10};
    const store = mockStore();

    const expectedActions = [
      {type: actions.FETCH_EXPENSES_START},
      {type: actions.FETCH_EXPENSES_SUCCESS, items: items, pager: pager}
    ];

    // nock('localhost').get('/api/expenses').reply(200, {body: {items, pager}});
    fetchMock.get('*', {status: 200, body: {pager, items}});

    return store.dispatch(actions.fetchExpenses()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

});
