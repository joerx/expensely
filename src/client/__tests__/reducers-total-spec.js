import * as reducers from '../reducers';
import * as actions from '../actions';

describe('total reducer', () => {

  it('should return the initial state', () => {
    const result = reducers.total(undefined, {});
    const expected = 0;
    expect(result).toEqual(expected);
  });

  it('should add the amount for an expense', () => {
    const action = {type: actions.ADD_EXPENSE, item: 'milk', amount: .5};
    const result = reducers.total(0, action);
    expect(result).toEqual(action.amount);
  });

  it('should remove the amount for an expense', () => {
    const state = 8;
    const action = {type: actions.REMOVE_EXPENSE, item: 'milk', amount: 1};
    const result = reducers.total(state, action);
    expect(result).toEqual(state-action.amount);
  });

});
