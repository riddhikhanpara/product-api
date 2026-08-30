const express = require('express');
const { authController } = require('../../controllers');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { authValidation } = require('../../validations');

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);
router.get('/me', auth, authController.me);

module.exports = router;
