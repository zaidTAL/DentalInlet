const express = require('express');
const {
  checkEmail,
  login,
  getMe,
} = require('../controllers/auth');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/check-email', checkEmail);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;
