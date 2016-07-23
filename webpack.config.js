const {resolve} = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
  return {
    entry: {
      app: resolve(__dirname, 'src/index.ts')
    },
    output: {
      filename: '[name].bundle.js',
      path: resolve(__dirname, 'dist')
      // pathinfo: true
    },
    resolve: {
      extensions: ['', '.ts', '.js']
    },
    context: resolve(__dirname, 'src'),
    devtool: env.prod ? 'source-map' : 'eval',
    module: {
      loaders: [
        {test: /.ts$/, loader: 'ts-loader', exclude: /node_modules/}
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        inject: 'body',
        hash: false
      }),
      env.prod ? new webpack.optimize.OccurrenceOrderPlugin() : undefined,
      env.prod ? new webpack.optimize.UglifyJsPlugin({
        compress: {
          drop_console: false,
          warnings: true,
          dead_code: true,
          unused: true
        },
        mangle: {
          except: ['$super', '$', 'exports', 'require']
        },
        sourceMap: true
      }) : undefined,
      env.prod ? new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: module => /node_modules/.test(module.resource)
      }) : undefined
    ].filter(p => !!p)
  };
};