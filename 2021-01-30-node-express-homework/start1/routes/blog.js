var express = require('express');
var router = express.Router();

/* GET blog page. */
router.get('/', function(req, res, next) {
  res.send('Welcome to blog');
});

router.get('/addarticle', function(req, res, next) {
  
  const obj = {
    buttonName: 'addArticle',
  };

  res.render('addarticle', obj);
});

router.get('/editarticle', function(req, res, next) {
  const obj = {
    buttonName: 'editArticle',
    str: 'Node или Node.js — программная платформа, основанная на движке V8',
  }
  res.render('editarticle', obj);
});

module.exports = router;