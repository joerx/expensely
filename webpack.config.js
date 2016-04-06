var path = require('path');

module.exports = {
  entry: './public/src/js/index.js', // entry point
  devtool: 'inline-source-map', // source mapping
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/, 
        loader: 'style!css'
      },
      {
        test: /public\/src\/.*\.js$/, 
        loader: 'babel', 
        query: {presets: ['react', 'es2015']},
        exclude: /node_modules/
      }
    ]
  }
}
