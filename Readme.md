# React Expense Tracker

## Tech Stack

- React, Babel
- Webpack
- No backend (for now)
- Heroku (eventually)

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
- No module for bootstrap that doesn't suck, just load from CDN

### 3. React

- `npm install react react-dom react-addons-test-utils --save-dev`
- We'll need `react-addons-test-util` later
