'use strict';

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const knex = require('knex');

const expensesStore = require('./app/store/expenses');
const config = require('./app/configure');

const PORT = process.env.PORT || 3000;
const app = express();

const db = knex(config.db);
const expenses = expensesStore(db);

app.use(bodyParser.json());
app.use(morgan('combined'));

app.get('/api', (req, res) => {
  res.status(200).json({msg: 'ok'});
});

app.get('/api/expenses', (req, res, next) => {
  expenses.findAll()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      next()
    });
});

app.listen(PORT, () => 
  console.log('Node app is running on port', PORT)
);
