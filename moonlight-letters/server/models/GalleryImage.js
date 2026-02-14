const mongoose = require('mongoose');

const galleryImageSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    title: {
        type: String, // Caption is optional
        required: false
    },
    description: {
        type: String,
        required: false
    },
    order: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const GalleryImage = mongoose.model('GalleryImage', galleryImageSchema);

module.exports = GalleryImage;
