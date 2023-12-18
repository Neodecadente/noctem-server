const fs = require('fs');
const Units = require('../data/Units.json');

// Load user data from JSON file
const loadUsersData = () => {
    const data = fs.readFileSync('./data/Users.json', 'utf8');
    return JSON.parse(data);
};

// Save user data to JSON file
const saveUsersData = (usersData) => {
    fs.writeFileSync('./data/Users.json', JSON.stringify(usersData));
};

// Get a random selection of units
const getRandomUnits = (userId, numberOfUnits) => {
    try {
        const usersData = loadUsersData();
        const user = usersData.find(user => user.id === userId);
        const shop = user.shop;
        const frozenUnits = shop.filter(unit => unit.frozen);
        const unitsToReplace = numberOfUnits - frozenUnits.length;

        const randomUnits = [];
        for (let i = 0; i < unitsToReplace; i++) {
            const randomIndex = Math.floor(Math.random() * Units.length);
            const unitData = Units[randomIndex];
            const unit = {
                id: unitData.id,
                name: unitData.name,
                originalhp: unitData.health,
                currenthp: unitData.health,
                maxhp: unitData.health,
                originalattack: unitData.attack,
                originaldefense: unitData.defense,
                originalspeed: unitData.speed,
                attack: unitData.attack,
                defense: unitData.defense,
                speed: unitData.speed,
                enhancers: [],
                debuffers: [],
                abilities: unitData.abilities.map(ability => ability.name)
            };
            randomUnits.push(unit);
        }
        const shopUnits = [...frozenUnits, ...randomUnits];
        return shopUnits;
    } catch (error) {
        throw error;
    }
};

// Save units to a specific collection (e.g., shop, inventory)
const saveUnits = (userId, units, collection) => {
    try {
        const usersData = loadUsersData();
        const user = usersData.find(user => user.id === userId);
        if (!user) throw new Error('User not found');
        user[collection].push(...units);
        saveUsersData(usersData);
        return user[collection];
    } catch (error) {
        throw error;
    }
};

// Buy a unit and add it to the user's inventory
const buyUnit = (userId, unitIndex) => {
    try {
        const usersData = loadUsersData();
        const user = usersData.find(user => user.id === userId);
        if (!user) throw new Error('User not found');
        const unit = user.shop[unitIndex];
        if (!unit) throw new Error('Unit not found');
        user.inventory.push(unit);
        user.shop.splice(unitIndex, 1);
        saveUsersData(usersData);
        return user.inventory;
    } catch (error) {
        throw error;
    }
};

// Sell a unit from a specific collection (e.g., board, inventory)
const sellUnit = (userId, unitIndex, collection) => {
    try {
        const usersData = loadUsersData();
        const user = usersData.find(user => user.id === userId);
        if (!user) throw new Error('User not found');

        let targetCollection;
        switch (collection) {
            case 'board':
                targetCollection = user.board;
                break;
            case 'inventory':
                targetCollection = user.inventory;
                break;
            default:
                throw new Error('Collection not valid');
        }

        const unit = targetCollection[unitIndex];
        if (!unit) throw new Error('Unit not found');
        targetCollection.splice(unitIndex, 1);
        saveUsersData(usersData);
        return targetCollection; // Returning user.shop for 'board' collection; you can adjust as needed
    } catch (error) {
        throw error;
    }
};

// Freeze a unit
const freezeUnit = (userId, unitIndex) => {
    try {
        // Read the JSON data from the file into memory
        const data = loadUsersData();

        // Find the user by userId
        const user = data.find(user => user.id === userId);
        if (!user) throw new Error('User not found');

        // Find the unit within the user's shop
        const unit = user.shop[unitIndex];
        if (!unit) throw new Error('Unit not found');

        // Update the 'frozen' property of the unit, if the property doesn't exist, create it and set it to true. If it exists and is true, set it to false.
        unit.frozen = unit.frozen ? false : true;

        // Write the modified data back to the file
        saveUsersData(data);

        // Return the updated user's shop or any other relevant data
        return user.shop;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    loadUsersData,
    saveUsersData,
    getRandomUnits,
    saveUnits,
    buyUnit,
    sellUnit,
    freezeUnit,
};
