const { Product } = require('../models');

exports.create = async (body) => {
    return Product.create(body);
};

exports.getAll = async (filter = {}) => {
    return Product.find({ ...filter, deletedAt: null }).sort({ createdAt: -1 });
};

exports.get = async (filter) => {
    return Product.findOne({ ...filter, deletedAt: null });
};

exports.update = async (filter, update) => {
    return Product.findOneAndUpdate(filter, update, { new: true });
};

exports.remove = async (filter) => {
    return Product.findOneAndUpdate(filter, { deletedAt: new Date() }, { new: true });
};
