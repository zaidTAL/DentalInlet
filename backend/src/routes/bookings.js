const express = require('express');
const {
  createBooking,
  getBookings,
  updateBookingStatus,
} = require('../controllers/bookings');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, getBookings)
  .post(createBooking);

router.route('/:id/status')
  .put(protect, updateBookingStatus);

module.exports = router;
