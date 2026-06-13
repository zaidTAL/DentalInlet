const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add your full name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email'],
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number'],
  },
  serviceName: {
    type: String,
    required: [true, 'Please specify the service'],
  },
  date: {
    type: Date,
    required: [true, 'Please add a preferred date'],
  },
  time: {
    type: String,
    required: [true, 'Please add a preferred time'],
  },
  explanation: {
    type: String,
    maxlength: [500, 'Explanation cannot be more than 500 characters'],
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Booking', BookingSchema);
