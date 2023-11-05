const router = require('express').Router();

const {image} = require('../libs/multer');
const {createImage, getAllImage, getImageById, deteletImage, updateImage} = require('../controllers/media.controllers');

//create image
router.post('/imagekit/image/create', image.single('data_gambar'), createImage);
//get all image
router.get('/imagekit/image', getAllImage);
//get image by id
router.get('/imagekit/image/:id', getImageById);
//delete image by id
router.delete('/imagekit/image/:id', deteletImage);
//update image 
router.put('/imagekit/image/:id', updateImage);

module.exports = router;
