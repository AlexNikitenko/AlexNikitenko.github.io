const request = require('request');
const fs = require('fs');
const http = require('http');

request('https://auto.ria.com/uk/search/?indexName=auto,order_auto,newauto_search&body.id[4]=2&year[0].gte=2012&year[0].lte=2012&categories.main.id=1&brand.id[0]=6&price.currency=1&gearbox.id[1]=2&gearbox.id[2]=3&fuel.id[1]=2&drive.id[0]=1&abroad.not=0&custom.not=1&page=0&size=50'
, function (error, response, body) {
  if(error) {
    console.log('ERROR!');
  } else {
      let str = body;
      let resultArr = [];
      let priceArr = str.split('<')
      .map(el => el.slice(el.indexOf('data-main-price="')))
      .filter(el => el.includes('data-main-price'))
      .map(el => el.slice(0, el.lastIndexOf('"')))
      .map(el => el.slice(el.indexOf('"') + 1));

      let modelArr = str.split('<')
      .map(el => el.slice(el.indexOf('data-mark-name="')))
      .filter(el => el.includes('data-mark-name'))
      .map(el => el.slice(el.indexOf('"') + 1))
      .map(el => el.slice(0, el.indexOf(' data-expire-date')))
      .map(el => el.slice(0, el.indexOf('""')))
      .map(el => el.replace('" data-model-name="',' / '))
      .map(el => el.replace('" data-year="',' / '))
      .map(el => el.split(' / '));

      modelArr.forEach((el, index) => el.push(priceArr[index]));

      for (let i = 0; i < modelArr.length; i++) {
        resultArr[i] = {
          Model: `${modelArr[i][0]}  ${modelArr[i][1]}`,
          Year: modelArr[i][2],
          Price: modelArr[i][3]
        }
      }

      http.createServer((request, response) => {
        response.writeHead(200);
        
          let bodyCenter = '';
          resultArr.forEach(el => {
           bodyCenter = `${bodyCenter}<tr><td>${el.Model}</td><td>${el.Year}</td><td>${el.Price}</td></tr>`;
          });
          
          body = `<!DOCTYPE html>
            <html>
            <head>
            <title>First https server</title>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            </head>
            <body>
            <table border="1">
            <caption>Таблица MMY</caption>
            <tr>
              <th>Model</th>
              <th>Year</th>
              <th>Price, USD</th>
            </tr>
            ${bodyCenter}
            </table>
            </body>
            </html>`;

          response.end(body);
      
      }).listen(8080);
    };

});
