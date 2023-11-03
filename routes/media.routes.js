const router = require('express').Router();

const {image} = require('../libs/multer');
const {createImage, getAllImage} = require('../controllers/media.controllers');

router.post('/imagekit/create', image.single('data_gambar'), createImage);

router.put('/imagekit/images', getAllImage);


module.exports = router;
