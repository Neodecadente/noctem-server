// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { createUser, getAllUsers } = require('../controllers/userController'); // Import the createUser controller function

// Create a new user
router.post('/', createUser); // Call the createUser controller function for POST requests

router.get('/', getAllUsers); // Call the getAllUsers controller function for GET requests

// Other routes for user-related operations (e.g., getting all users, updating users, deleting users)

module.exports = router;
