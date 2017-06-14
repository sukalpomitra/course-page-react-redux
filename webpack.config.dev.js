import webpack from 'webpack';
import path from 'path';

//The following object literal holds webpack properties
export default {
  debug: true, //show debug messages
  devtool: 'cheap-module-eval-source-map',
  noInfo: false, // webpck will display list of all files that its bundling
  //entry point for application
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true', //note that reload=true reloads the page if hot module reloading fails.
    path.resolve(__dirname, 'src/index') // this should always be last
  ],
  target: 'web', // to let webpack know that it needs to bundle for browser. we can set to node for node
  //where to create dev bundle. Note: webpack wont generate physical files for dev. It will serve from memory
  output: {
    path: __dirname + '/dist', // _ddirname is node var. Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src') // tell webpack where the code is
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), //replace modules without having to do full browser refresh
    new webpack.NoErrorsPlugin() // keep errors from breaking hotloading exp. Instead will show errors in console.
  ],
  //tell webpack types of files it should handle.
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']}, //handle js and also use babel to transpile our code
      {test: /(\.css)$/, loaders: ['style', 'css']},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'}, //the last 4 lines used by bootstrap to style
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ]
  }
};
