// src/app.js

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { sequelize } = require('./models'); // models are directly under src/models
const routes = require('./apis/routes'); // routes inside src/apis/routes
const errorMiddleware = require('./middlewares/errorMiddleware'); // middlewares inside src/middlewares

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api', routes);

// Error Handling Middleware
app.use(errorMiddleware);

// Server initialization
const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: false })
  .then(() => {
    console.log('Database connected & synced successfully.');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });
