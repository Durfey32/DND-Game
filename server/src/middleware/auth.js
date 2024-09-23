import jwt from 'jsonwebtoken';

// Middleware function to authenticate JWT token
export const authenticateToken = (req, res, next) => {
  // Get the authorization header from the request
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  // Check if the authorization header is present
  if (!token) 
    return res.status(401).json({ message: 'No token provided' }); 

  // Get the secret key from the environment variables
  const secretKey = process.env.JWT_SECRET_KEY || '';

  // Verify the JWT token
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403).json({message: 'Invalid token'}); // Send forbidden status if the token is invalid
    }

    // Attach the user information to the request object
    req.user = user;
    return next(); // Call the next middleware function
  });
};