import React from 'react';
import ExpenseRow from './ExpenseRow';

// List of expenses
// - expenses: array[expense]
// - onHistoryItemDelete: fn(id)
const ExpenseHistory = ({expenses, onItemDelete}) => {
  const list = expenses.map((e, idx) => (
    <ExpenseRow
      key={idx}
      amount={e.amount}
      label={e.item}
      actionIcon='trash'
      onActionClick={_ => onItemDelete(idx)} />
  ));
  return (<section className="expense-list">{list}</section>)
}

export default ExpenseHistory;
