const express = require('express');
const router = express.Router();
const { getImages, addImage, deleteImage } = require('../controllers/galleryController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getImages).post(protect, addImage);
router.route('/:id').delete(protect, deleteImage);

module.exports = router;
