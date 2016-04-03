module.exports = {
  entry: './src/js/index.js', // entry point
  devtool: 'inline-source-map', // source mapping
  output: {
    path: __dirname, // dist
    filename: 'bundle.js'
  },
  module: {
    loaders: [
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
