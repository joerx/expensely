'use strict';

const uuid = require('uuid');
const defaults = require('./defaults');

const RELATION = 'expenses';
const FIELDS = ['id', 'item', 'amount', 'date', 'created_at', 'updated_at'];

const findAll = (table, options) => {
  options = options || {};

  const pager = options.pager || {page: 1, pageSize: defaults.PAGE_SIZE};
  const offset = (pager.page-1)*pager.pageSize;

  const query = table
    .select(FIELDS)
    .limit(pager.pageSize)
    .offset(offset);

  if (options && options.after) {
    query.where('date', '>=', options.after)
  }

  return query.then(items => {
    return {items, pager};
  });
}

const ExpensesStore = module.exports = (db) => {

  const table = db(RELATION);

  return {
    findAll: findAll.bind(null, table)
  }
}

Object.assign(ExpensesStore, defaults);
