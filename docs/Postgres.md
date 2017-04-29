# postgres

user: postgres
cli: psql, psql -d expensely_dev

## create db

createdb expensely_dev
createdb expensely_test

## list dbs, tables

dbs: `\l`
change db: `\connect <db_name>`
tables: `\dt`

## list roles

\du or SELECT rolname FROM pg_roles;

## create role

```
create user vagrant
```

## alter role (set password)

```
alter role vagrant password 'vagrant';
```

## grant

```
GRANT ALL PRIVILEGES ON DATABASE expensely_test to vagrant;
```

