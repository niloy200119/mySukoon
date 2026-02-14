const asyncHandler = require('express-async-handler');
const LoveLetter = require('../models/LoveLetter');

// @desc    Get letter metadata (public)
// @route   GET /api/letter
// @access  Public
const getLetterInfo = asyncHandler(async (req, res) => {
    const letter = await LoveLetter.findOne({}, 'title isArrived createdAt'); 
    if (letter) {
        res.json(letter);
    } else {
        res.status(404);
        throw new Error('Letter not found');
    }
});

// @desc    Unlock letter content
// @route   POST /api/letter/unlock
// @access  Public (with password)
const unlockLetter = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const letter = await LoveLetter.findOne({});

    if (letter && (await letter.matchPassword(password))) {
        res.json({
            _id: letter._id,
            title: letter.title,
            content: letter.content,
            createdAt: letter.createdAt
        });
    } else {
        res.status(401);
        throw new Error('Invalid password');
    }
});

// @desc    Create/Update letter
// @route   POST /api/letter
// @access  Private/Admin
const updateLetter = asyncHandler(async (req, res) => {
    const { content, password, title } = req.body;
    
    // Check if letter exists, update it, otherwise create
    let letter = await LoveLetter.findOne({});

    if (letter) {
        letter.content = content || letter.content;
        letter.title = title || letter.title;
        if (password) {
            letter.password = password; // modification handled in schema pre-save
        }
        const updatedLetter = await letter.save();
        res.json(updatedLetter);
    } else {
        const newLetter = await LoveLetter.create({
            content,
            password,
            title
        });
        res.status(201).json(newLetter);
    }
});

module.exports = {
    getLetterInfo,
    unlockLetter,
    updateLetter
};
