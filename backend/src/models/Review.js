const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add your name'],
  },
  email: {
    type: String,
    required: [true, 'Please add your email'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Please add a rating between 1 and 5'],
  },
  text: {
    type: String,
    required: [true, 'Please add a review text'],
    minlength: [10, 'Review must be at least 10 characters'],
    maxlength: [1000, 'Review cannot be more than 1000 characters'],
  },
  verified: {
    type: Boolean,
    default: false,
  },
  helpful: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Review', ReviewSchema);
