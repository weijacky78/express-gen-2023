const express = require('express');
const router = express.Router();

/* GET home page. */

//1, 33, 637
//!0 , 05
router.get('/:bookId([1-9][0-9]*)', function (req, res, next) {

    //get bookid:? record

    res.render('book', { bookId: req.params.bookId });
});





module.exports = router;
