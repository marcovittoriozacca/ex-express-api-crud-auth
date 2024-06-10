const express = require('express');

//controller
const { store, show, index, update, destroy } = require('../controllers/posts.js');

//middlewares
const { verifyToken } = require('../middlewares/auth.js');
const { checkUser } = require('../middlewares/checkUser.js');

//validations
const validator = require('../middlewares/validator.js');
const { passedBody, postsSlug } = require('../validations/posts_schema.js');

const router = express.Router();

router.use('/:slug', validator(postsSlug));

router.get('/', index);
router.get('/:slug', show);

//middleware that checks the jwt token
router.use(verifyToken);
router.delete('/:slug', checkUser, destroy);

//passedBody contains all validations to create and update posts. only applies to store and update routes
router.use(validator(passedBody));
router.post('/', store);

router.put('/:slug', checkUser, update);


module.exports = router;