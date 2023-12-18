// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key'; // Replace with your actual secret key

// Middleware function to verify JWT tokens
function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        //return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            //return res.status(403).json({ message: 'Failed to authenticate token.' });
        }
        req.userId = decoded.userId; // Store the decoded user ID for later use
        next();
    });
}

module.exports = verifyToken;
