export const ADD_EXPENSE = 'ADD_EXPENSE'
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE'
export const RESET_EXPENSES = 'RESET_EXPENSES'

export function addExpense(item, amount) {
  return {type: ADD_EXPENSE, item, amount};
}

export function removeExpense(index) {
  return {type: REMOVE_EXPENSE, index};
}

export function resetExpenses() {
  return {type: RESET_EXPENSES};
};
