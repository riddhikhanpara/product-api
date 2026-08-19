const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        search: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        pin: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        listedAt: {
            type: String,
            required: true,
        },
        month: {
            type: String,
            required: true,
        },
        week: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        discount: {
            type: Number,
            default: 0,
        },
        inStock: {
            type: Boolean,
            default: false,
        },
        condition: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

productSchema.set('toJSON', {
    transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        return ret;
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
