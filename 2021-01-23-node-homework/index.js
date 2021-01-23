// Все операции с файлами производить с помощью билиотеки fs и асинхронных функций. 
// 1) создаём 2 папки, в одну папку кладём картинку,  например SVG-файл. Эту картинку 
// перемещаем из одной папки в другую. 
const request = require('request');
const fs = require('fs');

fs.rename('./img1/node-js-logo.svg','./img2/node-js-logo.svg', err  => {
  if (err) {
    console.log('ERR1:!', err);
  }
});

// 2) из прошлой домашки делаем request на dou.ua, добываем массив адресов картинок,
//  сохраняем его в файл arr.txt. 

request('https://dou.ua/', function (error, response, body) {
  if(error) {
    console.log('ERROR!');
  } else {
    let str = body;
    let tempArr = str.split('>')
    .map(el => el.slice(el.indexOf('src=')))
    .filter(elem => elem.includes('CACHE/images/img/announces/'))
    .map(el => el.slice(0, el.indexOf(' srcset=')))
    .map(el => el.slice(el.indexOf('"')+1))
    .map(el => el.slice(0, el.lastIndexOf('"')));
    fs.writeFile('arr.txt', `${tempArr}`, 'utf-8', err => {
      if (err) {
        console.log('ERR1:', err);
        return;
      }
      console.log('arr.txt file was created')
    })
    console.log(tempArr);
  };
});

// 3) запускаем сервер на встроенном https, выводим картинки из файла arr.txt.

// const https = require('https');

const http = require('http');
 
http.createServer((request, response) => {
     
  response.setHeader("Content-Type", "text/html");
  let bodyStart = '<!DOCTYPE html>'+
  '<html>'+
  '<head>'+
  '<title>First https server</title>'+
  '<meta http-equiv="Content-Type" content="text/html; '+
  'charset=UTF-8" />'+
  '</head>'+
  '<body>'+
  '<h2>Картинки с доу:</h2>';
  
  let bodyEnd = '</body>'+
  '</html>';
  let bodyCenter = '';
  fs.readFile('./arr.txt', (err, data) => {
    if (err) {
      console.log('Err!:', err);
      return;
    }

    let tempArr = data.toString().split(',');

    tempArr.forEach(el => {
      bodyCenter = bodyCenter + `<img src="${el}">`;
    });

    let body = bodyStart + bodyCenter + bodyEnd;
    response.end(body);
  })
}).listen(8080);