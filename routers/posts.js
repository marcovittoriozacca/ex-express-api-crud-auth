const express = require('express');

// posts controller
const { store, show, index, update, destroy } = require('../controllers/posts.js');

//middlewares
const { verifyToken } = require('../middlewares/auth.js');
const { checkUser } = require('../middlewares/checkUser.js');

//validations
const validator = require('../middlewares/validator.js');
const { passedBody, postsSlug } = require('../validations/posts_schema.js');

const router = express.Router();

// every route that has a slug will pass through this validator (a middleware)
router.use('/:slug', validator(postsSlug));

router.get('/', index); //index route

router.get('/:slug', show); //show route

//middleware that checks the jwt token
router.use(verifyToken);
router.delete('/:slug', checkUser, destroy); //delete route

//passedBody contains all validations to create and update posts. only applies to store and update routes
router.use(validator(passedBody));
router.post('/', store); //store route

router.put('/:slug', checkUser, update); //update route


module.exports = router;