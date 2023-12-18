// services/userService.js

const User = require('../models/User'); // Import the User model
const dataStore = require('../data/dataStore'); // Import the data store

const createUser = (username, email) => {
    // Validate data
    if (!username || !email) {
        throw new Error('Both username and email are required.');
    }

    // Check if the email is unique
    const isEmailUnique = dataStore.isEmailUnique(email);
    if (!isEmailUnique) {
        throw new Error('Email is already in use.');
    }

    // Generate a unique user ID (you can use a UUID library for this)
    const userId = Date.now().toString();

    // Create a new user object
    const user = new User(userId, username, email);

    // Add the user to the data store
    dataStore.addUser(user);

    return user;
};

const getAllUsers = () => {
    return dataStore.getUsers();
};

module.exports = { createUser, getAllUsers };
