const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const loveLetterSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true // Hashed password to unlock
    },
    title: {
        type: String,
        default: 'My Secret Letter'
    },
    isArrived: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

loveLetterSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Hash password before saving
loveLetterSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const LoveLetter = mongoose.model('LoveLetter', loveLetterSchema);

module.exports = LoveLetter;
