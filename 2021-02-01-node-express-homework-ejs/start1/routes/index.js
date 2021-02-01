var express = require('express');
var router = express.Router();
const moment = require('moment');

router.get('/:year/:month/', function(req, res, next) {
  console.log(req.params);

  const obj = {
    year : req.params.year,
    month: req.params.month,
    daysInMonth: moment([req.params.year, req.params.month], "YYYY-MM").daysInMonth(),
    firstMonthDayNum: moment([req.params.year, req.params.month, 1], "YYYY-MM").format('e'),
    weekArr: ['пн', 'вт','ср','чт','пт','сб','вс'],

  }
  console.log(obj.firstMonthDayNum);

  res.render('index', obj);
});

module.exports = router;
