const express = require('express');
const { productController } = require('../../controllers');
const validate = require('../../middlewares/validate');
const { productValidation } = require('../../validations');

const router = express.Router();

router.post('/', validate(productValidation.createProduct), productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:id', validate(productValidation.getProduct), productController.getProduct);
router.put('/:id', validate(productValidation.updateProduct), productController.updateProduct);
router.delete('/:id', validate(productValidation.deleteProduct), productController.deleteProduct);

module.exports = router;
