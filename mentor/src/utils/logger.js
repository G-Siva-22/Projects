const winston = require('winston');

// Create a logger with different levels of logging
const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: 'logs/app.log',
            level: 'info'
        })
    ]
});

// Log an info message
const logInfo = (message) => {
    logger.info(message);
};

// Log an error message
const logError = (message) => {
    logger.error(message);
};

// Log a warning message
const logWarn = (message) => {
    logger.warn(message);
};

module.exports = { logInfo, logError, logWarn };
