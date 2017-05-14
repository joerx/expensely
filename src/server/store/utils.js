'use strict';

const error = require('http-errors');

exports.translateDbError = (err) => {
  return Promise.reject(
    error.InternalServerError('database '+err.message)
  );
}
