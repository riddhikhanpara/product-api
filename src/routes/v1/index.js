const express = require('express');
const productRoute = require('./product.route');
const authRoute = require('./auth.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/products', productRoute);

module.exports = router;
