const mongoose = require('mongoose');
const config = require('../config/config');

module.exports = connectDB = async () => {
    try {
        await mongoose.connect(config.mongoose.url);
        console.log('db connected');
    } catch (error) {
        console.log('db connection error', error);
        process.exit(1);
    }
};
