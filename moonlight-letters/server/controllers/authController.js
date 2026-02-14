const asyncHandler = require('express-async-handler');
const AdminUser = require('../models/AdminUser');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
const authAdmin = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const admin = await AdminUser.findOne({ username });

    if (admin && (await admin.matchPassword(password))) {
        res.json({
            _id: admin._id,
            username: admin.username,
            token: generateToken(admin._id)
        });
    } else {
        res.status(401);
        throw new Error('Invalid username or password');
    }
});

// @desc    Register admin
// @route   POST /api/admin/register (seed ONLY, remove in prod or protect)
// @access  Public
const registerAdmin = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const userExists = await AdminUser.findOne({ username });

    if (userExists) {
        res.status(400);
        throw new Error('Admin already exists');
    }

    const admin = await AdminUser.create({
        username,
        password
    });

    if (admin) {
        res.status(201).json({
            _id: admin._id,
            username: admin.username,
            token: generateToken(admin._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid admin data');
    }
});

module.exports = { authAdmin, registerAdmin };
