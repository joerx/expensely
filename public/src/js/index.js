import '../style/custom.css'

import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';

import {App} from './containers';
import expenseApp from './reducers';

// fetch for fun
fetch('/api')
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.error(err);
  });

const store = createStore(expenseApp);

render(<App title="Sushi Fu" store={store} />, document.getElementById('app'));
