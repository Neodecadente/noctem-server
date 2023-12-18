const express = require('express');
const app = express();
const authMiddleware = require('./middleware/authMiddleware');

const port = 3000;

app.use(express.json());
app.use('/api', authMiddleware);

// Import user routes
const userRoutes = require('./routes/userRoutes');
const shopRoutes = require('./routes/shopRoutes');
const battleRoutes = require('./routes/battleRoutes');
const authRoutes = require('./routes/authRoutes');

// Public routes
app.use('/auth', authRoutes);
// Authentication required routes
app.use('/api/users', userRoutes);1
app.use('/api/shop', shopRoutes);
app.use('/api/battle', battleRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
