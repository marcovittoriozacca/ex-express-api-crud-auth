const prisma = require('../prisma/prismaClient.js');

const loginBody = {
    email: {
        in:["body"],
        notEmpty:{
            errorMessage: "Enter an email",
        },
        isEmail: {
            errorMessage: "Please insert a valid email"
        },
    },
    password: {
        in:["body"],
        notEmpty:{
            errorMessage: "Enter a password",
        }
    }
}

module.exports = {
    loginBody,
}