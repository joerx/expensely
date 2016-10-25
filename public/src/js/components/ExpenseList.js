import React from 'react';
import ExpenseRow from './ExpenseRow';
import LoadingRow from './LoadingRow';

// List of expenses
// - expenses: array[expense]
// - onHistoryItemDelete: fn(id)
const ExpenseHistory = ({expenses, fetching, onItemDelete}) => {
  console.log('fetching', fetching);
  if (fetching) {
    return <section><LoadingRow/></section>    
  }
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
