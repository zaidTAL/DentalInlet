const Review = require('../models/Review');

// @desc    Get all reviews
// @route   GET /api/v1/reviews
// @access  Public
exports.getReviews = async (req, res, next) => {
  try {
    // Return all reviews for now as requested
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new review
// @route   POST /api/v1/reviews
// @access  Public
exports.createReview = async (req, res, next) => {
  try {
    // Set verified to true by default for immediate visibility
    const reviewData = { ...req.body, verified: true };
    const review = await Review.create(reviewData);
    
    res.status(201).json({
      success: true,
      data: review,
      message: 'Review submitted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
