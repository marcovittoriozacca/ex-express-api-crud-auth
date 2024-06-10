const express = require('express');
const { register, login } = require('../controllers/auth.js');
const { registerBody } = require('../validations/auth_register.js');
const { loginBody } = require('../validations/auth_login.js');
const validator = require('../middlewares/validator.js');
const router = express.Router();


//register route - User create
router.post('/register', validator(registerBody), register);

router.post('/login', validator(loginBody), login);

module.exports = router;