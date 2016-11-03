'use strict';

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const knex = require('knex');
const error = require('http-errors');

const expensesStore = require('./store/expenses');
const config = require('./configure');

const PATH_TO_DIST = path.resolve(__dirname, '../../dist');

const app = module.exports = express();
const db = knex(config.db);
const expenses = expensesStore(db);

app.use(bodyParser.json());

// logging, don't log during tests
app.use(morgan('combined', {
  skip: (req, res) => process.env.NODE_ENV === 'test'
}));

// static files
app.use(express.static(PATH_TO_DIST));

// front page
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

// Not Found
app.use((req, res, next) => {
  next(error.NotFound());
});

app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(err.stack || err);
  }

  const status = err.status || 500;
  const message = err.message || 'Internal Sever Error';

  res.status(status).json({message});
});
