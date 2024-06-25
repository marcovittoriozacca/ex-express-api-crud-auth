const express = require('express');
const multer = require("multer");
const path = require("path");


// posts controller
const { store, show, index, update, destroy, postsByTag } = require('../controllers/posts.js');

//middlewares
const { verifyToken } = require('../middlewares/auth.js');
const { checkUser } = require('../middlewares/checkUser.js');

//validations
const validator = require('../middlewares/validator.js');
const { passedBody, postsSlug } = require('../validations/posts_schema.js');

const router = express.Router();

const storage = multer.diskStorage({
    destination: "public/posts_pic",
    filename: (req, file, cf) => {
        const fileType = path.extname(file.originalname);
        cf(null, String(Date.now()) + fileType)
    }
});
const upload = multer({storage});
router.get('/tag/:id', postsByTag);

// every route that has a slug will pass through this validator (a middleware)
router.use('/:slug', validator(postsSlug));

router.get('/', index); //index route
router.get('/:slug', show); //show route

//middleware that checks the jwt token
router.use(verifyToken);
// (checkUser route)
router.delete('/:slug', destroy); //delete route

//passedBody contains all validations to create and update posts. only applies to store and update routes

router.post('/', [upload.single("image"), validator(passedBody)], store); //store route

// (checkUser route)
router.put('/:slug',[upload.single("image"), validator(passedBody)], update); //update route


module.exports = router;