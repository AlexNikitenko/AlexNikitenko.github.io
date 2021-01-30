var express = require('express');
var router = express.Router();

/* GET blog page. */
router.get('/', function(req, res, next) {
  res.send('welcome to blog');
});

router.get('/addArticle', function(req, res, next) {
  res.send('Add Aticle');
});

router.get('/editArticle', function(req, res, next) {
  res.send('Edit Aticle');
});

module.exports = router;