const asyncHandler = require('express-async-handler');
const LoveReason = require('../models/LoveReason');

// @desc    Get all love reasons
// @route   GET /api/reasons
// @access  Public
const getReasons = asyncHandler(async (req, res) => {
    const reasons = await LoveReason.find({}).sort({ order: 1 });
    res.json(reasons);
});

// @desc    Create a love reason
// @route   POST /api/reasons
// @access  Private/Admin
const createReason = asyncHandler(async (req, res) => {
    const { title, description, image } = req.body;

    const reason = await LoveReason.create({
        title,
        description,
        image
    });

    res.status(201).json(reason);
});

// @desc    Delete a love reason
// @route   DELETE /api/reasons/:id
// @access  Private/Admin
const deleteReason = asyncHandler(async (req, res) => {
    const reason = await LoveReason.findById(req.params.id);
    if (reason) {
        await reason.deleteOne();
        res.json({ message: 'Reason removed' });
    } else {
        res.status(404);
        throw new Error('Reason not found');
    }
});

// @desc    Update a love reason
// @route   PUT /api/reasons/:id
// @access  Private/Admin
const updateReason = asyncHandler(async (req, res) => {
    const reason = await LoveReason.findById(req.params.id);
    if (reason) {
        reason.title = req.body.title || reason.title;
        reason.description = req.body.description || reason.description;
        reason.image = req.body.image !== undefined ? req.body.image : reason.image;
        reason.order = req.body.order !== undefined ? req.body.order : reason.order;
        const updated = await reason.save();
        res.json(updated);
    } else {
        res.status(404);
        throw new Error('Reason not found');
    }
});

module.exports = {
    getReasons,
    createReason,
    deleteReason,
    updateReason
};
