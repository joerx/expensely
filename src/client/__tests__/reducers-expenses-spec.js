import * as reducers from '../reducers';
import * as actions from '../actions';

describe('expenses reducer', () => {

  it('should return the initial state', () => {
    const result = reducers.expenses(undefined, {});
    const expected = [];
    expect(result).toEqual(expected);
  });

  it('should add an expense', () => {
    const action = {type: actions.ADD_EXPENSE, item: 'milk', amount: .5};
    const result = reducers.expenses([], action);
    expect(result).toEqual([{
      item: action.item,
      amount: action.amount
    }]);
  });

  it('should remove an expense', () => {
    const state = [
      {item: 'milk', amount: .5},
      {item: 'coffee', amount: 2},
    ];
    const action = {type: actions.REMOVE_EXPENSE, item: state[0]}
    const result = reducers.expenses(state, action);
    expect(result).toEqual([{item: 'coffee', amount: 2}]);
  });

  it('should reset expenses to initial state', () => {
    const state = [
      {item: 'milk', amount: .5},
      {item: 'coffee', amount: 2},
    ];
    const action = {type: actions.RESET_EXPENSES};
    const result = reducers.expenses(state, action);
    expect(result).toEqual([]);
  });

});
