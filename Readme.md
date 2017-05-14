# React Expense Tracker

Demo: https://expensely.herokuapp.com/

## Via Docker Compose

- Start app: `docker-compose up`
- Optional run db seed: `docker-compose run backend npm run seed`
- Run webpack dev server on your host: `npm run frontend:dev`

## Standalone

### Development

- Frontend: Node >= v4.4.5, NPM
- Backend: Node >= v6.9.1, PostGres ^9.4.9

## Configuration

- Set PG_URL, e.g. 'tcp://user:pass@hostname/dbname'

## Tests

### Backend

- Create database in Postgres, see [docs/Postgres.md](docs/Postgres.md)
- Run `source setenv-test.sh` for dev database
- Run `npm run test:backend` to server tests

### Frontend

- Run `npm run test:frontend` for frontend tests (No database needed)

## Development Environment

- Create database in Postgres, see [docs/Postgres.md](docs/Postgres.md)
- Run `source setenv-dev.sh` for dev database
- Backend: nodejs app, `npm run backend`, http://localhost:3000
- Frontend: webpack dev server `npm run frontend`, http://localhost:8080
- Uses dev server proxy option on `/api` to access backend API

## Vagrant

- Backend should run fine inside Vagrant box
- Frontend - need `--watch-poll` and `--host` params with `webpack-dev-server`
- Not recommended, rather run backend in Vagrant, forward ports & webpack on host machine

```sh
# webpack in vagrant: watch polling (slow) listen on all interfaces
webpack-dev-server --watch-poll --host 0.0.0.0 --content-base public/
```

## Docker

TODO
