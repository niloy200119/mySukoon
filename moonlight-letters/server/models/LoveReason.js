const mongoose = require('mongoose');

const loveReasonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String, // Reason details
        required: true
    },
    image: {
        type: String, // Optional icon or image
        required: false
    },
    order: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const LoveReason = mongoose.model('LoveReason', loveReasonSchema);

module.exports = LoveReason;
