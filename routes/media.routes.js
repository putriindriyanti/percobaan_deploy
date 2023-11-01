const router = require('express').Router();

const {image} = require('../libs/multer');
const {createImage} = require('../controllers/media.controllers');

router.post('/imagekit/create', image.single('data_gambar'), createImage);
// router.post('/imagekit/images', image.single('image'), imagekit);


module.exports = router;
