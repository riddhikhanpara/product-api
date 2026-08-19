const mongoose = require('mongoose');
const httpStatus = require('http-status');
const ApiError = require('../utils/apiError');

const errorConverter = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof ApiError)) {
        const statusCode =
            error.statusCode || error instanceof mongoose.Error
                ? httpStatus.BAD_REQUEST
                : httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statusCode];
        error = new ApiError(statusCode, message, false, err.stack);
    }
    next(error);
};

const errorHandler = (err, req, res, next) => {
    let { statusCode = 500, error } = err;

    res.status(statusCode).json({
        success: false,
        message: error,
    });
};

module.exports = {
    errorConverter,
    errorHandler,
};
