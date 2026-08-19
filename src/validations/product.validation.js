const Joi = require('joi');

const createProduct = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        search: Joi.string().required(),
        price: Joi.number().required(),
        email: Joi.string().email().required(),
        pin: Joi.string().required(),
        phone: Joi.string().required(),
        url: Joi.string().uri().required(),
        date: Joi.string().required(),
        time: Joi.string().required(),
        listedAt: Joi.string().required(),
        month: Joi.string().required(),
        week: Joi.string().required(),
        color: Joi.string().required(),
        discount: Joi.number(),
        inStock: Joi.boolean(),
        condition: Joi.string().required(),
        category: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().required(),
    }),
};

const getProduct = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

const updateProduct = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    body: Joi.object().keys({
        title: Joi.string().required(),
        search: Joi.string().required(),
        price: Joi.number().required(),
        email: Joi.string().email().required(),
        pin: Joi.string().required(),
        phone: Joi.string().required(),
        url: Joi.string().uri().required(),
        date: Joi.string().required(),
        time: Joi.string().required(),
        listedAt: Joi.string().required(),
        month: Joi.string().required(),
        week: Joi.string().required(),
        color: Joi.string().required(),
        discount: Joi.number(),
        inStock: Joi.boolean(),
        condition: Joi.string().required(),
        category: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().required(),
    }),
};

const deleteProduct = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

module.exports = {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
};
