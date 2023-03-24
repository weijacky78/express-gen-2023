const router = require('express').Router();
const photo = require('../model/photo');
const page = require('../model/page');

router.get('/', async (req, res) => {

    const photos = await photo.getPhotos();
    const menuItems = await page.getMenuItems();

    // console.log(photos.rows);
    //render template 'index.hbs', send the menu items as "menu", photo records as  "data"
    res.render('photos', { menu: menuItems, data: photos.rows });
});

router.get('/:photo_id([1-9][0-9]?)', async (req, res) => {
    // console.log(req.params.photo_id);
    const img = await photo.getPhoto(req.params.photo_id);
    const photos = await photo.getPhotos();
    const menuItems = await page.getMenuItems();
    res.render('photo', { data: img.rows, menu: menuItems, photos: photos.rows });

});

module.exports = router;