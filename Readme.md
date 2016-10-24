# React Expense Tracker

Demo: https://expensely.herokuapp.com/

## Requirements

- Frontend: Node >= v4.4.5, NPM
- Backend: Node >= v6.9.1, PostGres ^9.4.9

## Configuration

- PG_URL, e.g. 'tcp://user:pass@hostname/dbname'

## Dev Server

- Backend: nodejs app, `node api-server.js`, http://localhost:3000
- Frontend: webpack dev server `npm run dev-server`, http://localhost:8080
- Uses dev server proxy option on `/api` to access backend API

### Vagrant

- Backend should run fine inside Vagrant box
- Frontend - need `--watch-poll` and `--host` params with `webpack-dev-server`
- Not recommended, rather run backend in Vagrant, forward ports & webpack on host machine

```sh
# webpack in vagrant: watch polling (slow) listen on all interfaces
webpack-dev-server --watch-poll --host 0.0.0.0 --content-base public/
```

### Docker

TODO
