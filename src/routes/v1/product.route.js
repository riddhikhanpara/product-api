const express = require('express');
const { productController } = require('../../controllers');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { productValidation } = require('../../validations');

const router = express.Router();

router.post('/', auth, validate(productValidation.createProduct), productController.createProduct);
router.get('/', auth, validate(productValidation.getProducts), productController.getProducts);
router.get('/:id', auth, validate(productValidation.getProduct), productController.getProduct);
router.put('/:id', auth, validate(productValidation.updateProduct), productController.updateProduct);
router.delete('/:id', auth, validate(productValidation.deleteProduct), productController.deleteProduct);

module.exports = router;
