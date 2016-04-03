import '../style/custom.css'
import React from 'react';
import {render} from 'react-dom';
import App from './App';

const data = [
  {item: 'Milk', amount: 1.9},
  {item: 'Bananas', amount: 1.2},
  {item: 'Kitkat Share Pack', amount: 5.59}
];

render(<App title="My Foo" data={data} />, document.getElementById('app'));
