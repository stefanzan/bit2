// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/bx/biEval.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'bit2.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'BiEval',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  target:'node'
};
