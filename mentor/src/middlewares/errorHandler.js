const { ResponseWrapper } = require('../utils/ResponseWrapper');

// Error handling middleware: Catches errors and sends appropriate response
const errorHandler = (err, req, res, next) => {
    const response = ResponseWrapper;

    if (err.name === 'ValidationError') {
        response.responseMessage = 'Validation error occurred';
        response.exception.message = err.message;
        return res.status(400).json(response);
    }

    if (err.name === 'MongoError' && err.code === 11000) {
        response.responseMessage = 'Duplicate key error';
        response.exception.message = 'Duplicate key value found';
        return res.status(400).json(response);
    }

    if (err.status) {
        response.responseMessage = err.message || 'An error occurred';
        response.exception.message = err.exceptionMessage || 'Unknown error';
        return res.status(err.status).json(response);
    }

    response.responseMessage = 'Server error';
    response.exception.message = err.message || 'Unexpected error occurred';
    res.status(500).json(response);
};

module.exports = { errorHandler };
