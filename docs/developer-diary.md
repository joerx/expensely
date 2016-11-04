# React Expense Tracker

Demo: https://expensely.herokuapp.com/

## Tech Stack

- React, Babel
- Webpack
- Static backend (for now)

## Boilerplate (app)

- package.json

### 1. Webpack

- `npm install --save-dev webpack webpack-dev-server`
- Babel: `npm install babel-core babel-loader babel-preset-es2015 babel-preset-react`
- Build: `webpack`, then `open index.html`
- Dev server `webpack-dev-server --inline`, then `open http://localhost:8080`

webpack.config.js:

```js
var path = require('path');

module.exports = {
  entry: './src/js/index.js', // entry point
  devtool: 'inline-source-map', // source mapping
  output: {
    path: path.join(__dirname, '/dist'), // dist
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      // css loader
      {
        test: /\.css$/, 
        loader: 'style!css'
      },
      // js loader with babel
      {
        test: /\.js$/, 
        loader: 'babel', 
        query: {
          presets: ['react', 'es2015']
        }, 
        exclude: /node_modules/
      }
    ]
  }
}
```

### 2. CSS

- `npm install css-loader style-loader --save-dev`
- Used only for custom css styles
- No module for Bootstrap that doesn't suck, just load via `<link>` from CDN

### 3. React

- `npm install react react-dom react-addons-test-utils --save-dev`
- We'll need `react-addons-test-utils` later

### 4. Redux

- First attempt using Redux, so bear with me
- `npm install redux --save-dev`

### 5. Backend

- Just a static express server for Heroku
- No persistent storage, can add later

### 6. Jest

- Test framework by Facebook (for React?)
- `npm install jest-cli babel-polyfill babel-jest --save-dev`
- Locate tests in spec dir, exclude React from mocking
- Add to `package.json`:

```js
{
//...
  "jest": {
    "testDirectoryName": "spec",
    "unmockedModulePathPatterns": [
      "<rootDir>/node_modules/react",
      "<rootDir>/node_modules/react-dom",
      "<rootDir>/node_modules/react-addons-test-utils"
    ]
  },
//...
}
```

- Create `.babelrc`:

```js
{
  "presets": ["es2015", "react"]
}
```

### 6.2 House Keeping

- Some restructuring to accomodate backend code
- Move all frontend code into `public/`

## 7. Backend

- NodeJS + PostGres 9.4.9
- Vagrant box based on Debian 8 (Jessie)
- Mocha tests
- Knex.js as query builder (also allows migrations)
- Nothing special done it before
- No big deal with PostGres, seems to be faster in tests

## 8. Frontend + Backend

- Uses webpack-dev-server with API proxy
- Requires 2 processes: dev-server and api-server
- Webpack should not be run inside Vagrant (slow, synced folder problems)
- Backend must run in Vagrant (needs Postgres)
- Result: api-server in vagrant, forward ports, webpack-server proxy to http://localhost:3000/api

## 9. Frontend Testing

- Had an earlier setup which was completely outdated after a few weeks
- Some major restructuring of project layout, following https://github.com/RisingStack/react-way-getting-started
- Clean separation frontend/backend, src and dist files
- Keep tests closer to related source files, reduces cascading '../../../path/to/source'
- Testing redux: http://redux.js.org/docs/recipes/WritingTests.html

### 9.1 Action Creators

- Easiest to test
- Pure functions, deterministic out for given in, no side effects
- No dependencies

### 9.2 Async Action Creators

- More complex
- Have side effects (HTTP calls)
- Mock store to verify expected actions (https://github.com/arnaudbenard/redux-mock-store)
- Mock http requests using nock
- Still relatively nice to test since dispatch mechanism has loose coupling between action & store
- Only test the behaviour of the action chain, nothing else

Problems:

- Apparently nock as described in (http://redux.js.org/docs/recipes/WritingTests.html) doesn't work
- Works with fetch-mock (https://github.com/wheresrhys/fetch-mock)
- Must change `import fetch from 'isomorphic-fetch'` to `import isomorphic-fetch` (don't assign)

### 9.3 Reducers

- Most pleasant: pure functions, no side effects, minimal dependencies
- Zero boilerplate, very straightforward tests
