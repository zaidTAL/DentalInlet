const express = require('express');
const {
  getReviews,
  createReview,
} = require('../controllers/reviews');

const router = express.Router();

router.route('/').get(getReviews).post(createReview);

module.exports = router;
