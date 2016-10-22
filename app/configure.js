'use strict';

const assert = require('assert');
const url = require('url');

// PG_URL = tcp://user:pass@host/db
assert(process.env.PG_URL, 'PG_URL must be set');

const pgUrlObj = url.parse(process.env.PG_URL);
const [user, pass] = pgUrlObj.auth.split(':');

const config = module.exports = {
  db: {
    client: 'pg',
    connection: {
      user: user,
      password: pass,
      host: pgUrlObj.hostname,
      port: pgUrlObj.port || 5432,
      max: 10,
      database: pgUrlObj.pathname.replace(/\//g,'')
    }
  }
}
