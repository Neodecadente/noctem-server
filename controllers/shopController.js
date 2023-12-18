// controllers/shopController.js

const shopService = require('../services/shopService');

const offer = (req, res) => {
    try {
        const userId = "1";
        const randomUnits = shopService.getRandomUnits(userId, 6);
        const shopUnits = shopService.saveUnits(userId, randomUnits, "shop");
        // Respond with success and the random units
        res.status(200).json({ success: true, data: shopUnits });
    } catch (error) {
        // Handle errors from the user service
        res.status(400).json({ error: error.message });
    }
};

const buy = (req, res) => {
    try {
        const userId = "1";
        const unitIndex = "1";
        const userUnits = shopService.buyUnit(userId, unitIndex);
        res.status(200).json({ success: true, data: userUnits });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const sell = (req, res) => {
    try {
        const userId = "1";
        const unitIndex = "0";
        const collection = "inventory";
        const userUnits = shopService.sellUnit(userId, unitIndex, collection);
        res.status(200).json({ success: true, data: userUnits });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const freeze = (req, res) => {
    try {
        const userId = "1";
        const unitIndex = "1";
        const userUnits = shopService.freezeUnit(userId, unitIndex);
        res.status(200).json({ success: true, data: userUnits });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { offer, buy, sell, freeze };
