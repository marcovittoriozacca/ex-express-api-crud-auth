const express = require('express');

//controller
const { store, show, index, update, destroy } = require('../controllers/posts.js');

//validations
const validator = require('../middlewares/validator.js');
const { passedBody, postsSlug } = require('../validations/posts_schema.js');

const router = express.Router();

router.use('/:slug', validator(postsSlug));

router.get('/', index);
router.get('/:slug', show);
router.delete('/:slug', destroy);

//passedBody contains all validations to create and update posts. only applies to store and update routes
router.use(validator(passedBody));
router.post('/', store);
router.put('/:slug', update);


module.exports = router;