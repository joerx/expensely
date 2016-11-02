import React from 'react';
import printf from 'printf';
import ExpenseRow from './ExpenseRow';

// Summary row, presentational
// - amount: number
// - onResetClicked: fn()
const SummaryRow = ({onReset, total}) => (
  <section className="expense-summary">
    <ExpenseRow
      label="Total so far:"
      amount={total}
      actionIcon='refresh'
      onActionClick={_ => confirm('Are you sure?') && onReset()} />
  </section>
);

export default SummaryRow;
