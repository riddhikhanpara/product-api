const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/apiError');
const config = require('../config/config');

function makeToken(userId) {
    return jwt.sign({ sub: String(userId) }, config.jwt.secret, {
        expiresIn: config.jwt.expires,
    });
}

exports.register = async (body) => {
    const exists = await User.findOne({ email: body.email });
    if (exists) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'email already used');
    }
    const user = await User.create(body);
    return {
        user,
        token: makeToken(user._id),
    };
};

exports.login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user || !(await user.checkPassword(password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'wrong email or password');
    }
    return {
        user,
        token: makeToken(user._id),
    };
};

exports.getUser = async (id) => {
    return User.findById(id);
};
