var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'ExpressJS Lab3 -- Xin',
    name: req.login.auth ? req.login.username : "guest"
  });
});

router.all('/', function (req, res, next) {
  res.render('index', { title: 'ExpressJS Lab2 -- Xin' });
});

router.get('/lab2?', function (req, res, next) {
  res.render('index', { title: "lab2 cite", name: "Lucas", layout: null });
});

// router.get('/ca+ts', function (req, res, next) {
//   res.render('index', { title: "caaaaaaaaa...", name: "Luke" });
// });

router.get('/fro*do', function (req, res, next) {
  res.render('index', { title: "frodo is hungry, feed him", name: "Luke" });
});

router.get(/cat|dog/, function (req, res, next) {
  res.render('index', { title: "cat", name: "Luke" });
});

router.get('/:type(cat|dog)', function (req, res, next) {
  res.render('index', { title: req.params.type, name: "Luke" });
});


// router.get('/:msg', function (req, res, next) {
//   res.render('index', { title: req.params.msg });
// });



module.exports = router;
