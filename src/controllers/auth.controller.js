const httpStatus = require('http-status');
const { authService } = require('../services');
const catchAsync = require('../utils/catchAsync');

module.exports = {
    register: catchAsync(async (req, res) => {
        const data = await authService.register(req.body);
        res.status(httpStatus.CREATED).json({
            message: 'registered',
            data,
        });
    }),

    login: catchAsync(async (req, res) => {
        const data = await authService.login(req.body.email, req.body.password);
        res.status(httpStatus.OK).json({
            message: 'logged in',
            data,
        });
    }),

    me: catchAsync(async (req, res) => {
        res.status(httpStatus.OK).json({
            message: 'ok',
            data: req.user,
        });
    }),
};
