const express = require('express');
const router = express.Router();
const { getReasons, createReason, deleteReason, updateReason } = require('../controllers/loveReasonController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getReasons).post(protect, createReason);
router.route('/:id').put(protect, updateReason).delete(protect, deleteReason);

module.exports = router;
