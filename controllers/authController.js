// controllers/authController.js
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

const login = (req, res) => {
    try {
        const user = { userId: 1 };
        // Create and sign a JWT token
        const token = jwt.sign({ userId: user.userId }, secretKey);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { login };