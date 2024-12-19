const jwt = require('jsonwebtoken'); // Ensure you have jwt installed

// Middleware for user authentication
const verifyToken = async (req, res, next) => {
  const token = req.cookies.jwt || req.headers.authorization?.split('Bearer ')[1];

  console.log(`token: ${req.cookies.jwt}`)
  if (!token) {
    console.log('Unauthorized: No token provided')
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    jwt.verify(token, process.env.JWT_SEC, (err, decoded) => {
      if (err) {
        console.log('Invalid token')

        return res.status(403).json({ message: 'Invalid token' });
      }

      // Add the decoded user info to the request object
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error('Error verifying ID token:', error);
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// Middleware for admin authentication
const verifyAdmin = (req, res, next) => {
  // Ensure the user is authenticated using the verifyToken middleware
  if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied: User is not an admin' });
  }

  // Proceed to the next middleware or route handler
  next();
};

module.exports = { verifyToken, verifyAdmin };
