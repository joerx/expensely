'use strict';

const uuid = require('uuid');
const defaults = require('./defaults');
const utils = require('./utils');
const error = require('http-errors');

const TABLE = 'expenses';
const FIELDS = ['id', 'item', 'amount', 'date', 'created_at', 'updated_at'];

const validate = (expense) => {
  if (!expense.item || typeof expense.item !== 'string') {
    return error.BadRequest('Item must be a string');
  }
  if (isNaN(expense.amount) || expense.amount === Infinity) {
    return error.BadRequest('Amount must be a number');
  }
  if (expense.amount < 0) {
    return error.BadRequest('Amount must be a positive number');
  }
}

const store = module.exports = (db) => {

  const store = {};

  /**
   * Find all expenses from database, optionally accepts a pager object and additional filter
   * options.
   */
  store.findAll = (options) => {
    options = options || {};

    const pager = options.pager || {page: 1, pageSize: defaults.PAGE_SIZE};
    const offset = (pager.page-1)*pager.pageSize;

    const query = db
      .table(TABLE)
      .select(FIELDS)
      .limit(pager.pageSize)
      .offset(offset);

    if (options && options.after) {
      query.where('date', '>=', options.after)
    }

    return query
      .then(items => ({items, pager}))
      .catch(utils.translateDbError)
  }

  /**
   * Insert new record into database
   */
  store.insert = (data) => {
    data.id = uuid.v4();

    const err = validate(data);
    if (err) return Promise.reject(err);

    return db.table(TABLE)
      .insert(data)
      .returning(FIELDS)
      .then(r => r[0])
      .catch(utils.translateDbError)
  }

  return store;
}
