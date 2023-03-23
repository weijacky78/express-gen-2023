const express = require('express');
const router = express.Router();
// const router = require('express').Router(); shortcut for line 1 ,2

const page = require('../model/page');



/* GET home page. */
router.get('/', function (req, res, next) {
  loadPage('breeds', req, res, next);
});

router.get('/:key', async function (req, res, next) {
  loadPage(req.params.key, req, res, next);
});

let loadPage = async function (key, req, res, next) {
  //eg url: localhost:9000/care
  //key ==> care
  const pg = await page.getPage(key); //try to retrieve the row from model for the key "care"
  //pg. =>(row, status)
  if (pg.status == false) {
    next(); // no matching page, call next (go to next endpoint handler)
  } else {
    //there is a matching page (with key ==> "care")
    res.render('index', { //render template 'index.hbs', send the page title, page content
      title: pg.row.title,
      name: req.login.auth ? req.login.username : "guest",
      content: pg.row.content
    });
  }
};

module.exports = router;
