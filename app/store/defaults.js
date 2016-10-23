'use strict';

module.exports = class DefaultStore {
  constructor(db) {
    this.table = (tableName) => db(tableName);
  }

  get PAGE_SIZE () {
    return 50;
  }
}
