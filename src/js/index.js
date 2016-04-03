import '../style/custom.css'
import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import App from './App';
import expenseApp from './reducers';
import {addExpense, removeExpense, resetExpenses} from './actions';

const store = createStore(expenseApp);

// console.log(store.getState());

// store.subscribe(() => 
//   console.log(store.getState())
// );

render(<App title="My Expenses" store={store} />, document.getElementById('app'));
