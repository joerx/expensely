'use strict';

const moment = require('moment');
const uuid = require('uuid');

const items = ['Milk', 'Lettuce', 'Soap', 'Water', 'Apples', 'Petrol'];

exports.seed = function(knex) {
  return knex('expenses').del().then(() => {
    return Promise.all(mkExpenses().map(exp => knex('expenses').insert(exp)));
  });
};

function mkExpenses() {
  const rows = [];
  const today = moment();

  for(let i = 0; i < 20; i++) {
    rows.push({
      id: uuid.v4(),
      item: items[Math.floor(Math.random()*items.length)],
      amount: Math.round(Math.random()*50)/10,
      date: moment().subtract(i+1, 'days')
    });
  }

  return rows;
}
