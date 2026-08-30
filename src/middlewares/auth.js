const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/apiError');
const config = require('../config/config');

const auth = async (req, res, next) => {
    try {
        const header = req.headers.authorization || '';
        let token = null;
        if (header.startsWith('Bearer ')) {
            token = header.slice(7);
        }
        if (!token) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'please login');
        }

        const payload = jwt.verify(token, config.jwt.secret);
        const user = await User.findById(payload.sub);
        if (!user) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'please login');
        }

        req.user = user;
        next();
    } catch (err) {
        if (err instanceof ApiError) {
            return next(err);
        }
        next(new ApiError(httpStatus.UNAUTHORIZED, 'please login'));
    }
};

module.exports = auth;
