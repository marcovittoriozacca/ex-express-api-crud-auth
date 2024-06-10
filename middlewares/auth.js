const jwt = require("jsonwebtoken");
require('dotenv').config();

const generateToken = user => {
    const payload = {
        id: user.id,
        email: user.email
    }
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: "5h"});
}


const verifyToken = (req, res, next) => {

    const { authorization } = req.headers
    if(!authorization) throw new Error("Please provide an authentication token");

    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({error: err.message});

        next()

    })
    
}

module.exports = {
    generateToken,
    verifyToken
}