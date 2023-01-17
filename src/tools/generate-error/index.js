const fs = require('fs');
const { parse } = require('csv-parse');
const template = require('./template');
require('colors');

const csvData = [];
const errorEnumDirectory = './src/pkg';


fs.createReadStream(__dirname + '/err_code.csv')
  .pipe(parse({ delimiter: ',', fromLine: 2 }))
  .on('data', function (csvrow) {
    csvData.push(csvrow);
  })
  .on('end', function () {
    const content = template(csvData);
    if (!fs.existsSync(errorEnumDirectory)) {
      fs.mkdirSync(errorEnumDirectory);
    }
    fs.writeFileSync(`${errorEnumDirectory}/appError.js`, content);
    console.log(
      `Successfully created error enums under: ${
        `${errorEnumDirectory}/appError.js`.green
      }`
    );
  });
