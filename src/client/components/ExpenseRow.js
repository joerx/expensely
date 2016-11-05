import React from 'react';
import ucfirst from '../helpers/ucfirst';
import printf from 'printf';

// Single expense
// - onDelete()
const ExpenseRow = ({label, amount, actionIcon, onActionClick}) => (
  <div className="expense-row">
    <span className="expense-label">{ucfirst(label)}</span>
    <span className="pull-right expense-amount">{printf('%.2f S$', amount)}
      <a onClick={onActionClick}>
        <span className={`glyphicon glyphicon-${actionIcon}`}/>
      </a>
    </span>
  </div>
);

export default ExpenseRow;
