'use strict';

const knex = require('knex');
const moment = require('moment');
const error = require('http-errors');
const store = require('../../app/store/expenses');
const config = require('../../app/configure');

const expect = require('./helpers/chai').expect;
const mkExpenses = require('./fixture/expenses');
const fixture = require('./fixture/loader');

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

  describe('findAll', () => {

    beforeEach(() =>
      fixture(db).load({expenses: mkExpenses()})
    );

    it('should return all expenses on a page of default page size', () => {
      return expenses.findAll().then(result => {
        expect(result.items.length).to.equal(expenses.PAGE_SIZE);
        expect(result.pager.page).to.equal(1);
        expect(result.pager.pageSize).to.equal(expenses.PAGE_SIZE);
      });
    });

    it('should return all expenses after a given date', () => {
      const date = moment([lastYear, 10, 1]).toDate(); // 2 * 20 = 40
      return expenses.findAll({after: date}).then(result => {
        expect(result.items.length).to.equal(2 * 20);
        expect(result.pager.page).to.equal(1);
        expect(result.pager.pageSize).to.equal(expenses.PAGE_SIZE);
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

  describe('create', () => {

    const expense = {
      item: 'milk',
      amount: 2.5,
      date: new Date(),
    }

    beforeEach(() =>
      fixture(db).clear('expenses')
    );

    it('should insert the record', () =>
      expenses.insert(expense)
        .then(res => expenses.findAll())
        .then(res => expect(res.items.length).to.equal(1))
    );

    it('should return the expense with generated id', () =>
      expenses.insert(expense).then(res => {
        expect(res.id).not.to.be.undefined;
        expect(res.id).not.to.be.null;
      })
    );

    it('should set the current date as default date', () =>
      expenses.insert({item: 'oj', amount: 10}).then(res => {
        const fmt = 'YYYY-MM-DD';
        const today = moment().format(fmt);
        expect(res.date).not.to.be.undefined;
        expect(moment(res.date).format(fmt)).to.equal(today);
      })
    );

    it('should set created_at and updated_at', () =>
      expenses.insert(expense).then(res => {
        expect(res.created_at).not.to.be.undefined;
        expect(res.created_at).not.to.be.null;
        expect(res.created_at).to.be.instanceof(Date);
        expect(res.updated_at).not.to.be.undefined;
        expect(res.updated_at).not.to.be.null;
        expect(res.updated_at).to.be.instanceof(Date);
      })
    );

    it('should not accept an entry w/o item', () => {
      let data = Object.assign({}, expense);
      data.item = undefined;
      return expect(expenses.insert(data))
        .to.be.rejectedWith(error.BadRequest, /item must be a string/i);
    });

    it('should not accept an entry w/o amount', () => {
      let data = Object.assign({}, expense);
      data.amount = undefined;
      return expect(expenses.insert(data))
        .to.be.rejectedWith(error.BadRequest, /amount must be a number/i);
    });

    it('should not accept an entry w/ negative amount', () => {
      let data = Object.assign({}, expense);
      data.amount = -1;
      return expect(expenses.insert(data))
        .to.be.rejectedWith(error.BadRequest, /amount must be a positive number/i);
    });

    it('should accept amount of 0', () => {
      let data = Object.assign({}, expense);
      data.amount = 0;
      return expect(expenses.insert(data)).not.to.be.rejected;
    });

    it('should not accept amount of NaN', () => {
      let data = Object.assign({}, expense);
      data.amount = NaN;
      return expect(expenses.insert(data))
        .to.be.rejectedWith(error.BadRequest, /amount must be a number/i);
    });

    it('should not accept amount of Infinity', () => {
      let data = Object.assign({}, expense);
      data.amount = Infinity;
      return expect(expenses.insert(data))
        .to.be.rejectedWith(error.BadRequest, /amount must be a number/i);
    });

    it('should not accept an amount that is not a number', () => {
      let data = Object.assign({}, expense);
      data.amount = 'zero';
      return expect(expenses.insert(data))
        .to.be.rejectedWith(error.BadRequest, /amount must be a number/i);
    });
  });

});
