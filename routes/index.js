var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'ExpressJS Lab2 -- Xin' });
});

router.get('/lab2?', function (req, res, next) {
  res.render('index', { title: "lab2 cite", name: "Lucas" });
});

// router.get('/:msg', function (req, res, next) {
//   res.render('index', { title: req.params.msg });
// });



module.exports = router;
