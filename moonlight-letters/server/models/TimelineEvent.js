const mongoose = require('mongoose');

const timelineEventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String, // URL to image
        required: false
    },
    date: {
        type: Date,
        required: true
    },
    order: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const TimelineEvent = mongoose.model('TimelineEvent', timelineEventSchema);

module.exports = TimelineEvent;
