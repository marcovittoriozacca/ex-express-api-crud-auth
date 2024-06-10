const express = require('express');
const { store } = require('../controllers/auth.js');
const { registerBody } = require('../validations/auth_register.js');
const validator = require('../middlewares/validator.js');
const router = express.Router();


//register route - User create
router.post('/register', validator(registerBody) ,store);

module.exports = router;