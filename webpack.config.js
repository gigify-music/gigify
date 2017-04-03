const path = require('path');
const srcPath = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, 'public');

const config = {
  context: srcPath,
  entry: path.resolve(__dirname, 'src/index'),
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: 'public/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
//
//   module: {
//     loaders: [
//       {
//         test: /\.jsx?$/,
//         exclude: /(node_modules)/,
//         loader: 'babel-loader',
//         query: {
//           presets: ['react', 'es2015']
//         }
//       }
//     ]
//   }
// };
  module: {
    rules: [
      {
        use: [{
          loader: 'babel-loader',
          options: { presets: ['airbnb', 'stage-1'] },
        }],
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
      },
    ],
  },
};

module.exports = config;
