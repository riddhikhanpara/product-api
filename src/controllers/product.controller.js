const httpStatus = require('http-status');
const { productService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/apiError');

module.exports = {
    createProduct: catchAsync(async (req, res) => {
        const product = await productService.create(req.body);
        res.status(httpStatus.CREATED).json({
            message: 'Product created successfully',
            data: product,
        });
    }),

    getProducts: catchAsync(async (req, res) => {
        const products = await productService.getAll();
        res.status(httpStatus.OK).json({
            message: 'Products retrieved successfully',
            data: products,
        });
    }),

    getProduct: catchAsync(async (req, res) => {
        const product = await productService.get({ _id: req.params.id });
        if (!product) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
        }
        res.status(httpStatus.OK).json({
            message: 'Product retrieved successfully',
            data: product,
        });
    }),

    updateProduct: catchAsync(async (req, res) => {
        const product = await productService.update({ _id: req.params.id, deletedAt: null }, req.body);
        if (!product) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
        }
        res.status(httpStatus.OK).json({
            message: 'Product updated successfully',
            data: product,
        });
    }),

    deleteProduct: catchAsync(async (req, res) => {
        const product = await productService.remove({ _id: req.params.id, deletedAt: null });
        if (!product) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
        }
        res.status(httpStatus.OK).json({
            message: 'Product deleted successfully',
        });
    }),
};
