//More info on webpack's Node API here: https://ebpack.github.io/docs/node.js-api.html
//Allowing console calls below as it is a build file
/*eslint-disable no-console*/
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import colors from 'colors';

process.env.NODE_ENV = 'production'; // this assures the babel dev config for hot reloading does not apply

console.log('Generating minified bundle for production via webpack. This will take some moment...'.blue);

webpack(webpackConfig).run((err, stats) => {
  if (err) {// so a fatal error occured. Stop here
    console.log(err.bold.red);
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => {
      console.log(error.red);
    });
  }

  if (jsonStats.hasWarnings){
    console.log('Webpack generated the following warnings: '.bold.yellow);
    jsonStats.warnings.map(warning => {
      console.log(warning.yellow);
    });
  }

  console.log(`Webpack Stats: ${stats}`);

  //if we got this far the build succeeded
  console.log('Your app has been compiled in production mode and written to /dist. It\'s ready to roll'.green);

  return 0;
});
