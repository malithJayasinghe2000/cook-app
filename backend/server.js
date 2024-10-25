const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const mealRoutes = require('./routes/mealRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors'); 

dotenv.config();
const app = express();

// Connect to mongoDB
connectDB();

// middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser()); 

app.use('/api/auth', authRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/user', userRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});