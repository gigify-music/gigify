const path = require('path');
const srcPath = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, 'build');

const config = {
  context: srcPath,
  entry: path.join(__dirname, '/src/index.js'),
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: 'build/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};
//   module: {
//     [
//       {
//         use: [{
//           loader: 'babel-loader',
//           options: { presets: ['airbnb', 'stage-1']},
//         }],
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//       },
//     ],
//   },
// };

module.exports = config;
