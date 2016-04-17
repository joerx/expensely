import React from 'react';
import {connect} from 'react-redux';

import {addExpense, removeExpense, resetExpenses} from './actions';
import InputField from './components/InputField';
import SummaryRow from './components/SummaryRow';
import ExpenseList from './components/ExpenseList';

const AddExpense = connect(
  state => state,
  dispatch => ({
    onSubmit: ({item, amount}) => dispatch(addExpense(item, amount))
  })
)(InputField);

const Summary = connect(
  state => state,
  dispatch => ({
    onReset: _ => dispatch(resetExpenses())
  })
)(SummaryRow);

const ExpenseHistory = connect(
  state => state,
  dispatch => ({
    onItemDelete: id => dispatch(removeExpense(id)),
  })
)(ExpenseList);

// App, presentational, renders everything else
export const App = (props) => (
  <div>
    <h1 className="title">{props.title}</h1>
    <AddExpense store={props.store} />
    <Summary store={props.store} />
    <ExpenseHistory store={props.store} />
  </div>
);
