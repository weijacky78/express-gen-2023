const express = require('express');
const router = express.Router();

/* GET home page. */

router.get('/:fro', function (req, res, next) {

    //get bookid:? record

    res.send(req.params.fro);
});

router.get('/:fromId-:toId', function (req, res, next) {

    //get bookid:? record

    res.render('book', { fromId: req.params.fromId, toId: req.params.toId });
});

//1, 33, 637
//!0 , 05
router.get('/:bookId([1-9][0-9]*)', function (req, res, next) {

    //get bookid:? record

    res.render('book', { bookId: req.params.bookId });
});





module.exports = router;
