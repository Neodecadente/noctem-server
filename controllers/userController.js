// controllers/userController.js

const userService = require('../services/userService'); // Import the user service

// Controller function for creating a new user
const createUser = (req, res) => {
    const { username, email } = req.body;

    try {
        // Create a new user through the user service
        const user = userService.createUser(username, email);
        res.status(201).json(user); // Respond with the created user
    } catch (error) {
        // Handle errors from the user service
        res.status(400).json({ error: error.message });
    }
};

const getAllUsers = (req, res) => {
    try {
        const users = userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        // Handle errors from the user service
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { createUser, getAllUsers };
