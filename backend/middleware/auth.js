// Simple auth middleware for development
const auth = (req, res, next) => {
  // For development, allow all requests
  // In production, you should implement proper authentication
  next();
};

module.exports = auth; 