'use strict';

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const knex = require('knex');
const error = require('http-errors');
const pkg = require('../../package.json');

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
  res.status(200).json({
    msg: 'ok',
    version: pkg.version
  });
});

app.get('/api/debug', (req, res) => {
  res.status(200).json({
    headers: req.headers
  })
});

// GET expenses
app.get('/api/expenses', (req, res, next) => {
  // res.status(200).json({hello: 'world'});
  expenses.findAll()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      next(err);
    });
});

// Not Found
app.use((req, res, next) => {
  next(error.NotFound());
});

// Error handler
app.use((err, req, res, next) => {

  const status = err.status || 500;
  const message = err.message || 'Internal Sever Error';

  if (process.env.NODE_ENV !== 'test' && status >= 500) {
    console.error(err.stack || err);
  }

  res.status(status).json({message});
});
