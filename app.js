require('dotenv').config();
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
const app = express();

//env
const { PORT } = process.env;
const { HOST } = process.env;

app.use(cors());
app.use(express.json());

app.use("/posts", posts);
app.use("/categories", categories);
app.use("/tags", tags);

app.use(multer().none());
app.use("/auth", auth);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, HOST, () => {
    console.log(`http://${HOST}:${PORT}`);
} )
