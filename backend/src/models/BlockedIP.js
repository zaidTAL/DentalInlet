const mongoose = require('mongoose');

const BlockedIPSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
    unique: true,
  },
  reason: {
    type: String,
    default: 'Security violation',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('BlockedIP', BlockedIPSchema);
