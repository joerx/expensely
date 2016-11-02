'use strict';

const uuid = require('uuid');
const DefaultStore = require('./defaults');
const error = require('http-errors');

const TABLE = 'expenses';
const FIELDS = ['id', 'item', 'amount', 'date', 'created_at', 'updated_at'];

const store = module.exports = (db) => {
  return new ExpensesStore(db);
}

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

class ExpensesStore extends DefaultStore {

  constructor(db) {
    super(db);
  }

  findAll(options) {
    options = options || {};

    const pager = options.pager || {page: 1, pageSize: this.PAGE_SIZE};
    const offset = (pager.page-1)*pager.pageSize;

    const q = this
      .table(TABLE)
      .select(FIELDS)
      .limit(pager.pageSize)
      .offset(offset);

    if (options && options.after) {
      q.where('date', '>=', options.after)
    }

    return q.then(items => {
      return {items, pager};
    });
  }

  insert(data) {
    data.id = uuid.v4();

    let err = validate(data);
    if (err) return Promise.reject(err);

    return this.table(TABLE)
      .insert(data)
      .returning(FIELDS)
      .then(r => r[0]);
  }
}
