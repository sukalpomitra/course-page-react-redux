import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const GLOBALS = {
  'process.env.NODE_ENV':JSON.stringify('production')
};

//The following object literal holds webpack properties
export default {
  debug: true, //show debug messages
  devtool: 'source-map',//use this for prod as its more thorough though slow
  noInfo: false, // webpck will display list of all files that its bundling
  //entry point for application
  entry: path.resolve(__dirname, 'src/index'),
  target: 'web', // to let webpack know that it needs to bundle for browser. we can set to node for node
  //where to create dev bundle. Note: webpack wont generate physical files for dev. It will serve from memory
  output: {
    path: __dirname + '/dist', // _ddirname is node var. Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist') // prod should be from dist
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  //tell webpack types of files it should handle.
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']}, //handle js and also use babel to transpile our code
      {test: /(\.css)$/, loader: ExtractTextPlugin.extract("css?ourceMap")},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'}, //the last 4 lines used by bootstrap to style
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ]
  }
};
