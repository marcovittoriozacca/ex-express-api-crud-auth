const express = require('express');

//controller
const { index, store, show, update, destroy } = require('../controllers/categories.js');

//validations
const { categoriesId } = require('../validations/generals.js');
const categoriesVal = require('../validations/categories_schema.js');
const validator = require('../middlewares/validator.js');


const router = express.Router();

//categoriesId validator only applies to routers with "/:id"
router.use('/:id', validator(categoriesId))

router.get('/', index);
router.get('/:id', show);
router.delete('/:id', destroy);

//categoriesVal with validations for the name only applies in store and update routes
router.use(validator(categoriesVal))
router.post('/', store);
router.put('/:id', update);




module.exports = router;