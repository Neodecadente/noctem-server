// controllers/battleController.js

const battleService = require('../services/battleService'); // Import the user service

// Controller function for creating a new user
const execute = (req, res) => {
    try {
        userId = "1";
        const user = battleService.simulateBattle(userId);
        res.status(201).json(user); // Respond with the battle log
    } catch (error) {
        // Handle errors from the user service
        res.status(400).json({ error: error.message });
    }
};

module.exports = { execute };
