import fs from 'fs';
import cheerio from 'cheerio';
import colors from 'colors';

/*eslint-disable no-console */
/* what this is doing is reading index.html and giving to cheerio
 * cheerio then makes a in-mem dom which then we query and add the stylesheet */
fs.readFile('src/index.html', 'utf8', (err, markup) => {
  if (err){
    return console.log(err);
  }

  const $ = cheerio.load(markup);

  //since a seperate spreadsheet is only utilized for the production, need to dynamically
  $('head').prepend('<link rel="stylesheet" href="styles.css">');

  fs.writeFile('dist/index.html', $.html(), 'utf8', function(err) {
    if (err){
      return console.log(err);
    }
    console.log('index.html written to /dist'.green);
  });
});
