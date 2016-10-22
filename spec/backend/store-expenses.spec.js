'use strict';

const knex = require('knex');
const expect = require('chai').expect;
const moment = require('moment');
const store = require('../../app/store/expenses');
const config = require('../../app/configure');
const loadExpenses = require('./fixture/expenses');

const lastYear = moment().subtract(1, 'year').year();

// Tests for expenses store
// 
// Fixture: 20 records per month over 12 months of previous year
// Total: 12 * 20 = 240
// Default page size: 50
// Max page size: 100

describe('expenses store', () => {

  const db = knex(config.db);
  const expenses = store(db);

  beforeEach(loadExpenses(db));

  it('should return all expenses on a page of default page size', () => {
    return expenses.findAll().then(result => {
      expect(result.items.length).to.equal(store.PAGE_SIZE);
      expect(result.pager.page).to.equal(1);
      expect(result.pager.pageSize).to.equal(store.PAGE_SIZE);
    });
  });

  it('should return all expenses after a given date', () => {
    const date = moment([lastYear, 10, 1]).toDate(); // 2 * 20 = 40
    return expenses.findAll({after: date}).then(result => {
      expect(result.items.length).to.equal(2 * 20);
      expect(result.pager.page).to.equal(1);
      expect(result.pager.pageSize).to.equal(store.PAGE_SIZE);
    });
  });

  it('should return all expenses with given pager', () => {
    const pageSize = 10, page = 2;
    return expenses.findAll({pager: {page, pageSize}}).then(result => {
      expect(result.items.length).to.equal(pageSize);
      expect(result.pager.page).to.equal(page);
      expect(result.pager.pageSize).to.equal(pageSize);
    });
  });

});
