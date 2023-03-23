const router = require('express').Router();
const photo = require('../model/photo');

router.get('/', async (req, res) => {

    const photos = await photo.getPhotos();
    // console.log(photos.rows);
    res.render('photos', photos.rows);

});

router.get('/:photo_id([1-9][0-9]?)', async (req, res) => {

    const photos = await photo.getPhoto(req.params.photo_id);
    console.log(photos.rows);
    res.render('photo', photos.rows);

});

module.exports = router;