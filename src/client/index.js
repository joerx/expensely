import './styles/custom.css';

import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import {fetchExpenses} from './actions';
import {App} from './containers';
import reducers from './reducers';

const loggerMiddleware = createLogger();

const store = createStore(
  reducers, 
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  ));

store.dispatch(fetchExpenses()).then(() => {
  console.log(store.getState());
});

render(<App title="Expensely" store={store} />, document.getElementById('app'));
