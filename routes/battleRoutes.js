// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { execute } = require('../controllers/battleController');

router.get('/execute', execute);

module.exports = router;