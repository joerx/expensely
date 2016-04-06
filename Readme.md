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
