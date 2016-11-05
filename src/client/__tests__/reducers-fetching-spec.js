import * as reducers from '../reducers';
import * as actions from '../actions';

describe('Fetching state reducer', () => {

  it('should return initial state', () => {
    const result = reducers.fetching(undefined, {});
    expect(result).toEqual(false);
  });

  it('should mutate to true for FETCH_EXPENSES_START', () => {
    const result = reducers.fetching(false, {type: actions.FETCH_EXPENSES_START});
    expect(result).toEqual(true);
  });

  it('should mutate to false for FETCH_EXPENSES_SUCCESS', () => {
    const result = reducers.fetching(true, {type: actions.FETCH_EXPENSES_SUCCESS});
    expect(result).toEqual(false);
  });

  it('should mutate to false for FETCH_EXPENSES_ERROR', () => {
    const result = reducers.fetching(true, {type: actions.FETCH_EXPENSES_ERROR});
    expect(result).toEqual(false);
  });

  it('should not mutate state for other actions', () => {
    const result = reducers.fetching(true, {type: 'foo'});
    expect(result).toEqual(true);
  });
});
