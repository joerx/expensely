import React from 'react';
import ucfirst from '../helpers/ucfirst';
import printf from 'printf';

// Single expense
// - onDelete()
const ExpenseRow = ({label, amount, actionIcon, onActionClick}) => (
  <div className="expense-row">
    {ucfirst(label)}
    <span className="pull-right">{printf('%.2f S$', amount)}
      <a onClick={onActionClick}>
        <span className={`glyphicon glyphicon-${actionIcon}`}/>
      </a>
    </span>
  </div>
);

export default ExpenseRow;
