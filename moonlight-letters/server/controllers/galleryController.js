const asyncHandler = require('express-async-handler');
const GalleryImage = require('../models/GalleryImage');

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
const getImages = asyncHandler(async (req, res) => {
    const images = await GalleryImage.find({}).sort({ order: 1 });
    res.json(images);
});

// @desc    Add a gallery image
// @route   POST /api/gallery
// @access  Private/Admin
const addImage = asyncHandler(async (req, res) => {
    const { imageUrl, title, description } = req.body;

    if (!imageUrl) {
        res.status(400);
        throw new Error('Please provide an image URL');
    }

    const image = await GalleryImage.create({ imageUrl, title, description });
    res.status(201).json(image);
});

// @desc    Delete a gallery image
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
const deleteImage = asyncHandler(async (req, res) => {
    const image = await GalleryImage.findById(req.params.id);
    if (image) {
        await image.deleteOne();
        res.json({ message: 'Image removed' });
    } else {
        res.status(404);
        throw new Error('Image not found');
    }
});

module.exports = { getImages, addImage, deleteImage };
