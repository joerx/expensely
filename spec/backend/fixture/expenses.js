'use strict';

const moment = require('moment');
const uuid = require('uuid');

module.exports = function mkExpenses() {
  const year = moment().subtract(1, 'year').year();
  const rows = [];

  for(let month = 0; month < 12; month++) {
    for(let i = 0; i < 20; i++) {
      let id = uuid.v4();
      let item = `expense_${month}_${i}`;
      rows.push({
        id: id,
        item: item,
        amount: i + 10,
        date: moment([year, month, i+1])
      });
    }
  }

  return rows;
}
