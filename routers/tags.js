const express = require('express');

//controller
const { store, index, show, update, destroy } = require('../controllers/tags.js');

//validations
const validator = require('../middlewares/validator.js');
const { tagsId } = require('../validations/generals.js');
const tagsVal = require('../validations/tags_schema.js');

const router = express.Router();

router.use('/:id', validator(tagsId));

router.get('/', index);

router.get('/:id', show);

router.delete('/:id', destroy);

router.use(validator(tagsVal))

router.put('/:id', update);

router.post('/', store);

module.exports = router;