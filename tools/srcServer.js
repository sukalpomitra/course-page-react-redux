import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';

/* eslint-disable no-console */

const port = 3000;
const app = express(); //create an instance of express
const compiler = webpack(config); //pass the webpack.config.dev.js

//pass the compiled webpack config
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

//use wildcard to route all request to index.html
app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

//start the express server and listen to 3000 port
app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
