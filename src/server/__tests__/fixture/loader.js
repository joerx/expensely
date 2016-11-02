'use strict';

const FixtureLoader = function(conn) {
  this.table = (name) => {
    return conn(name);
  }
}

FixtureLoader.prototype.load = function(data) {
  const promises = [];
  let table;
  for (let tableName in data) {
    table = this.table(tableName);
    promises.push(
      this.clear(tableName).then(() => table.insert(data[tableName]))
    );
  }
  return Promise.all(promises);
}

FixtureLoader.prototype.clear = function(tableName) {
  return this.table(tableName).truncate();
}

const fixture = module.exports = function(conn) {
  return new FixtureLoader(conn);
}
