import {ADD_EXPENSE, REMOVE_EXPENSE, RESET_EXPENSES} from './actions';

const initialState = {
  expenses: [],
  total: 0.0
};

// this is the reducer - it must be a pure function. it receives the current state
// and recent action. it will return the new state. It will never perform anything
// that has side effects and it will not mutate any of it's arguments
// 
// Problem: one big reducer is hard to test. break it down into individual reducers,
// one for each part of the state (expenses, total).
export default function expenseApp(state = initialState, action) {
  switch(action.type) {
    case ADD_EXPENSE: 
      return Object.assign({}, state, {
        expenses: state.expenses.concat({
          item: action.item, 
          amount: action.amount
        }),
        total: state.total + action.amount
      });

    case REMOVE_EXPENSE:
      const newExpenses = [].concat(state.expenses);
      const deleted = newExpenses.splice(action.index, 1)[0];
      return Object.assign({}, state, {
        expenses: newExpenses,
        total: Math.abs(state.total - deleted.amount)
      });

    case RESET_EXPENSES:
      return initialState;

    default:
      return state;
  }
};
