const request = require('request');
const fs = require('fs');

request('https://dou.ua/', function (error, response, body) {
  if(error) {
    console.log('ERROR!');
  } else {
    let str = body;
    let strLen = `CACHE/images/img/announces/`.length;
    str.split('>')
    .map(el => el.slice(el.indexOf('CACHE/images/img/announces')))
    .filter(elem => elem.includes('announce'))
    .map(el => el.slice(0, el.indexOf('"')))
    .map(el => el.slice(strLen))
    .map(el => el.split('/'))
    .forEach(el => request(`https://s.dou.ua/CACHE/images/img/announces/${el[0]}/${el[1]}`).pipe(fs.createWriteStream(`./images/${el[1]}`)));
  };
});
