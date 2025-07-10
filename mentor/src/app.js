const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

// Importing Routes
const commentRoutes = require('./apis/routes/commentRoutes');
const joinRequestRoutes = require('./apis/routes/joinRequestRoutes');
const monthlyReportRoutes = require('./apis/routes/monthlyReportsRoutes');
const projectRoutes = require('./apis/routes/projectRoutes');
const projectStatsRoutes = require('./apis/routes/projectStatsRoutes');
const projectteamRoutes = require('./apis/routes/projectTeamRoutes');
const projectupdateRoutes = require('./apis/routes/projectUpdatesRoutes');
const userRoutes = require('./apis/routes/userRoutes');


// Importing Middlewares
const { authenticate } = require('./middlewares/authMiddleware');
const { errorHandler } = require('./middlewares/errorMiddleware');

// Configure dotenv to load environment variables
dotenv.config();

// Middlewares
app.use(cors());  // Enable Cross-Origin Request Sharing (CORS)
app.use(express.json()); // Parse incoming JSON requests
app.use(morgan('dev'));  // Logging requests for debugging in dev environment

// Use routes
app.use('/api', commentRoutes); // Comment routes
app.use('/api', joinRequestRoutes); // Join request routes
app.use('/api', monthlyReportRoutes); // Monthly report routes
app.use('/api', projectRoutes); // Project routes
app.use('/api', projectStatsRoutes); // Project status routes
app.use('/api', projectteamRoutes); // Project team routes
app.use('/api', projectupdateRoutes); // Project update routes
app.use('/api', userRoutes); // User routes

// Error handling middleware
app.use(errorHandler);

// Default Route for Testing
app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Mentoring System API');
});

// Set up the server to listen on a specific port
const PORT = process.env.PORT ||5000; // Default to 5000 if PORT is not specified in .env
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
