const BlockedIP = require('../models/BlockedIP');

const securityAudit = async (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;

  // Simple patterns for demonstration of security violation detection
  // In production, you'd use a more robust WAF or pattern matcher
  const maliciousPatterns = [
    /<script/i,
    /javascript:/i,
    /onload=/i,
    /onerror=/i,
    /union select/i,
    /drop table/i,
    /--/i,
    /' or 1=1/i,
    /" or 1=1/i
  ];

  const checkObject = (obj) => {
    const stringified = JSON.stringify(obj);
    return maliciousPatterns.some(pattern => pattern.test(stringified));
  };

  const isMalicious = checkObject(req.body) || checkObject(req.query) || checkObject(req.params);

  if (isMalicious) {
    try {
      await BlockedIP.create({
        ip,
        reason: 'Attempted injection or XSS attack detected.'
      });
      console.log(`IP BANNED: ${ip} for malicious activity.`);
      return res.status(403).json({
        success: false,
        message: 'Your IP has been permanently banned due to security violations.'
      });
    } catch (err) {
      // If already banned or error, still block
      return res.status(403).json({
        success: false,
        message: 'Security violation detected.'
      });
    }
  }

  next();
};

module.exports = securityAudit;
