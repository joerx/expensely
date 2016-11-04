import * as actions from './actions';
import {combineReducers} from 'redux';

const initialState = {
  expenses: [],
  total: 0.0,
  fetching: false
};

/**
 * Reducer handling the list of expenses - add, remove, fetch, etc.
 */
export function expenses(state=initialState.expenses, action) {
  switch(action.type) {
    case actions.ADD_EXPENSE: 
      return state.concat({
        item: action.item, 
        amount: action.amount
      });

    case actions.REMOVE_EXPENSE:
      const newExpenses = [].concat(state);
      const idx = newExpenses.indexOf(action.item)
      newExpenses.splice(idx, 1);
      return newExpenses;

    case actions.RESET_EXPENSES:
      return initialState.expenses;

    case actions.FETCH_EXPENSES_SUCCESS:
      return action.items;

    default:
      return state;
  }
}

/**
 * Reducer handling the total amount of all expenses.
 */
export function total(state=initialState.total, action) {
  switch(action.type) {
    case actions.ADD_EXPENSE:
      return state + action.amount

    case actions.REMOVE_EXPENSE:
      return state - action.amount;

    case actions.FETCH_EXPENSES_SUCCESS:
      return action.items.reduce((prev, cur) => prev+cur.amount, 0);

    default:
      return state;
  }
}

/**
 * Reducer handling the 'fetching' state for ongoing backend operations.
 */
export function fetching(state=initialState.fetching, action) {
  switch(action.type) {
    case actions.FETCH_EXPENSES_START:
      return true;

    case actions.FETCH_EXPENSES_SUCCESS:
      return false;

    default:
      return state;
  }
}

/**
 * Combine all reducers
 */
const rootReducer = combineReducers({
  expenses,
  total,
  fetching
});

export default rootReducer;
