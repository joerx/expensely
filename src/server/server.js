'use strict';

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const knex = require('knex');

const expensesStore = require('./store/expenses');
const config = require('./configure');

const PATH_TO_DIST = path.resolve(__dirname, '../../dist');
const PORT = process.env.PORT || 3000;

const app = express();
const db = knex(config.db);
const expenses = expensesStore(db);

app.use(bodyParser.json());
app.use(morgan('combined'));

// static files
app.use(express.static(PATH_TO_DIST));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../static/index.html'));
});

// index endpoint
app.get('/api', (req, res) => {
  res.status(200).json({msg: 'ok'});
});

// GET expenses
app.get('/api/expenses', (req, res, next) => {
  expenses.findAll()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      next()
    });
});

// start
app.listen(PORT, () => 
  console.log('Node app is running on port', PORT)
);
