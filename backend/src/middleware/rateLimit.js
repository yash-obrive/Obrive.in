const rateLimitMap = new Map();

/**
 * Creates a rate limiter middleware for Express.
 * @param {number} maxRequests Maximum number of requests allowed in the window.
 * @param {number} windowMs Time window in milliseconds.
 */
function createRateLimiter(maxRequests = 5, windowMs = 15 * 60 * 1000) {
  return function (req, res, next) {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record) {
      rateLimitMap.set(ip, { count: 1, timestamp: now });
      return next();
    }

    if (now - record.timestamp > windowMs) {
      rateLimitMap.set(ip, { count: 1, timestamp: now });
      return next();
    }

    if (record.count >= maxRequests) {
      return res.status(429).json({ error: 'Too many requests, please try again later.' });
    }

    record.count++;
    next();
  };
}

module.exports = { createRateLimiter };
