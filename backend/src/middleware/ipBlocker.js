const BlockedIP = require('../models/BlockedIP');

const ipBlocker = async (req, res, next) => {
  try {
    const ip = req.ip || req.connection.remoteAddress;
    const isBlocked = await BlockedIP.findOne({ ip });

    if (isBlocked) {
      return res.status(403).json({
        success: false,
        message: 'Your IP has been permanently banned from this server due to security violations.',
      });
    }

    next();
  } catch (error) {
    next();
  }
};

module.exports = ipBlocker;
