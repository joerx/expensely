'use strict';

import * as actions from '../actions';

describe('action', () => {

  it('should create an action to add an expense', () => {
    const item = 'Milk';
    const amount = .5;

    const expected = {
      type: actions.ADD_EXPENSE,
      item: item,
      amount: amount
    };

    expect(actions.addExpense(item, amount)).toEqual(expected);
  })
})
