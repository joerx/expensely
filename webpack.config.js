var path = require('path');

module.exports = {
  entry: './src/client/index.js', // entry point
  devtool: 'inline-source-map', // source mapping
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/, 
        loader: 'style!css'
      },
      {
        test: /src\/client\/.*\.js$/, 
        loader: 'babel', 
        query: {presets: ['react', 'es2015']},
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    // Proxy API calls, API server must be running on localhost:3000
    // You can run it in Vagrant/Docker, just forward ports accordingly
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false
      }
    }
  }
}
