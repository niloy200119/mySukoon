const asyncHandler = require('express-async-handler');
const TimelineEvent = require('../models/TimelineEvent');

// @desc    Get all timeline events
// @route   GET /api/timeline
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
    const events = await TimelineEvent.find({}).sort({ date: 1, order: 1 });
    res.json(events);
});

// @desc    Create a timeline event
// @route   POST /api/timeline
// @access  Private/Admin
const createEvent = asyncHandler(async (req, res) => {
    const { title, description, image, date } = req.body;

    if (!title || !description || !date) {
        res.status(400);
        throw new Error('Please enter all fields');
    }

    const event = await TimelineEvent.create({
        title,
        description,
        image,
        date
    });

    res.status(201).json(event);
});

// @desc    Delete a timeline event
// @route   DELETE /api/timeline/:id
// @access  Private/Admin
const deleteEvent = asyncHandler(async (req, res) => {
    const event = await TimelineEvent.findById(req.params.id);
    if (event) {
        await event.deleteOne();
        res.json({ message: 'Event removed' });
    } else {
        res.status(404);
        throw new Error('Event not found');
    }
});

// @desc    Update a timeline event
// @route   PUT /api/timeline/:id
// @access  Private/Admin
const updateEvent = asyncHandler(async (req, res) => {
    const event = await TimelineEvent.findById(req.params.id);
    if (event) {
        event.title = req.body.title || event.title;
        event.description = req.body.description || event.description;
        event.image = req.body.image !== undefined ? req.body.image : event.image;
        event.date = req.body.date || event.date;
        event.order = req.body.order !== undefined ? req.body.order : event.order;
        const updated = await event.save();
        res.json(updated);
    } else {
        res.status(404);
        throw new Error('Event not found');
    }
});

module.exports = {
    getEvents,
    createEvent,
    deleteEvent,
    updateEvent
};
