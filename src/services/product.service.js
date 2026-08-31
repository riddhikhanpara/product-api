const { Product } = require('../models');

exports.create = async (body) => {
    return Product.create(body);
};

exports.getAll = async (filter = {}, options = {}) => {
    const page = options.page || 1;
    const limit = options.limit || 10;
    const skip = (page - 1) * limit;
    const query = { ...filter, deletedAt: null };

    const total = await Product.countDocuments(query);
    const results = await Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);

    return {
        results,
        page,
        limit,
        total,
        totalPages: total ? Math.ceil(total / limit) : 1,
    };
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
