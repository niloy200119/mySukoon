const express = require('express');
const router = express.Router();
const { getLetterInfo, unlockLetter, updateLetter } = require('../controllers/loveLetterController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getLetterInfo).post(protect, updateLetter);
router.post('/unlock', unlockLetter);

module.exports = router;
