// import fetch from 'isomorphic-fetch';

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const RESET_EXPENSES = 'RESET_EXPENSES';
export const FETCH_EXPENSES_START = 'FETCH_EXPENSES_START';
export const FETCH_EXPENSES_SUCCESS = 'FETCH_EXPENSES_SUCCESS';
export const FETCH_EXPENSES_ERROR = 'FETCH_EXPENSES_ERROR';

export function addExpense(item, amount) {
  return {type: ADD_EXPENSE, item, amount};
}

export function removeExpense(index) {
  return {type: REMOVE_EXPENSE, index};
}

export function resetExpenses() {
  return {type: RESET_EXPENSES};
};

export function fetchExpensesStart() {
  return {type: FETCH_EXPENSES_START};
};

export function fetchExpensesError(error) {
  return {
    type: FETCH_EXPENSES_ERROR,
    error: error
  }
};

export function fetchExpensesSuccess({items, pager}) {
  return {
    type: FETCH_EXPENSES_SUCCESS,
    items: items,
    pager: pager
  }
};

export function fetchExpenses() {
  return (dispatch) => {
    dispatch(fetchExpensesStart()); // 1st - async action start
    return fetch('http://localhost/api/expenses')
      .then(response => response.json())
      .then(json => dispatch(fetchExpensesSuccess(json))) // 2nd dispatch - async action end
      .catch(err => {
        console.log('ERROR', err);
        fetchExpensesError(err)
      });
  }
}
