const User = require('../models/User');

// @desc    Check if email matches doctor and if user exists
// @route   POST /api/v1/auth/check-email
// @access  Public
exports.checkEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, error: 'Please provide an email' });
    }

    const isDoctor = email.toLowerCase() === process.env.DOCTOR_EMAIL.toLowerCase();

    if (!isDoctor) {
      return res.status(200).json({ success: true, isDoctor: false });
    }

    // For the secret key approach, we don't strictly need a DB user if we're just matching a string,
    // but keeping the logic consistent for future DB-driven admin features.
    // For now, we'll tell the frontend the account "exists" so it always asks for the password.
    res.status(200).json({
      success: true,
      isDoctor: true,
      exists: true 
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login doctor using secret key
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide email and password' });
    }

    // 1. Verify it's the doctor's email
    if (email.toLowerCase() !== process.env.DOCTOR_EMAIL.toLowerCase()) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // 2. Verify the password matches the SECRET_KEY from .env
    if (password !== process.env.SECRET_KEY) {
      return res.status(401).json({ success: false, error: 'Invalid secret key' });
    }

    // 3. To maintain JWT compatibility for protected routes, 
    // we find or create a placeholder user object in the DB.
    let user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      // Create a dummy user if it doesn't exist so we can generate a real token
      user = await User.create({ 
        email: email.toLowerCase(), 
        password: process.env.SECRET_KEY // This will be hashed by the model pre-save
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
};

// Get token from model and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({
    success: true,
    token,
  });
};
