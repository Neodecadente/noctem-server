// dataStore.js
const User = require('../models/User');

const users = [];

module.exports = {
    addUser: (user) => {
        users.push(user);
    },
    getUsers: () => {
        return users;
    },
};
