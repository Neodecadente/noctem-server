// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { offer, buy, sell, freeze } = require('../controllers/shopController');

router.get('/offer', offer);
router.post('/buy', buy);
router.post('/sell', sell);
router.post('/freeze', freeze);

module.exports = router;
