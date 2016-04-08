import '../style/custom.css'
import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {App} from './components';
import expenseApp from './reducers';
import {addExpense, removeExpense, resetExpenses} from './actions';

const store = createStore(expenseApp);

render(<App title="My Expenses" store={store} />, document.getElementById('app'));
