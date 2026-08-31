const httpStatus = require('http-status');
const { productService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/apiError');

module.exports = {
    createProduct: catchAsync(async (req, res) => {
        const product = await productService.create(req.body);
        res.status(httpStatus.CREATED).json({ message: 'created', data: product });
    }),

    getProducts: catchAsync(async (req, res) => {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const data = await productService.getAll({}, { page, limit });
        res.status(httpStatus.OK).json({ message: 'ok', data });
    }),

    getProduct: catchAsync(async (req, res) => {
        const product = await productService.get({ _id: req.params.id });
        if (!product) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
        }
        res.status(httpStatus.OK).json({ message: 'ok', data: product });
    }),

    updateProduct: catchAsync(async (req, res) => {
        const product = await productService.update({ _id: req.params.id, deletedAt: null }, req.body);
        if (!product) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
        }
        res.status(httpStatus.OK).json({ message: 'updated', data: product });
    }),

    deleteProduct: catchAsync(async (req, res) => {
        const product = await productService.remove({ _id: req.params.id, deletedAt: null });
        if (!product) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
        }
        res.status(httpStatus.OK).json({ message: 'deleted' });
    }),
};
