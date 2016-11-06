import React from 'react';
import ExpenseRow from './ExpenseRow';
import LoadingRow from './LoadingRow';

// List of expenses
// - expenses: array[expense]
// - onHistoryItemDelete: fn(id)
const ExpenseList = ({expenses, fetching, onItemDelete}) => {
  if (fetching) {
    return <section><LoadingRow/></section>;
  }
  const list = expenses.map((expense, idx) => (
    <ExpenseRow
      key={idx}
      amount={expense.amount}
      label={expense.item}
      actionIcon='trash'
      onActionClick={_ => onItemDelete(expense)} />
  ));
  return <section className="expense-list">{list}</section>;
}

export default ExpenseList;
