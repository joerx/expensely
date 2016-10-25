import * as actions from './actions';
import {combineReducers} from 'redux';

const initialState = {
  expenses: [],
  total: 0.0,
  fetching: false
};

function expenses(state=initialState.expenses, action) {
  switch(action.type) {
    case actions.ADD_EXPENSE: 
      return state.expenses.concat({
        item: action.item, 
        amount: action.amount
      });

    case actions.REMOVE_EXPENSE:
      const newExpenses = [].concat(state.expenses);
      const deleted = newExpenses.splice(action.index, 1)[0];
      return newExpenses;

    case actions.RESET_EXPENSES:
      return initialState.expenses;

    case actions.FETCH_EXPENSES_SUCCESS:
      return action.items;

    default:
      return state;
  }
}

function total(state=initialState.total, action) {
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

function fetching(state=initialState.fetching, action) {
  switch(action.type) {
    case actions.FETCH_EXPENSES_START:
      return true;

    case actions.FETCH_EXPENSES_SUCCESS:
      return false;

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  expenses,
  total,
  fetching
});

export default rootReducer;
