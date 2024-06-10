// dotenv config
require('dotenv').config();

//packages
const express = require('express');
const multer = require('multer');
const cors = require("cors");


//middlewares
const notFoundHandler = require('./middlewares/notFoundHandler.js');
const errorHandler = require('./middlewares/errorHandler.js');

//routers
const posts = require('./routers/posts.js');
const categories = require('./routers/categories.js');
const tags = require('./routers/tags.js');
const auth = require('./routers/auth.js');

//env
const { PORT } = process.env || 3000;
const { HOST } = process.env || "localhost";

const app = express();

//cors resolution
app.use(cors());

app.use(express.json());

//posts, categories, tags routes
app.use("/posts", posts);
app.use("/categories", categories);
app.use("/tags", tags);

//auth route
app.use(multer().none());
app.use("/auth", auth);

//error handler and not found handler middlewares
app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, HOST, () => {
    console.log(`http://${HOST}:${PORT}`);
} )
