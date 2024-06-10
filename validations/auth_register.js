const prisma = require('../prisma/prismaClient.js');

const registerBody = {
    email:{
        in: ["body"],
        notEmpty: {
            errorMessage: "Email is a require field"
        },
        isEmail: {
            errorMessage: "Please insert a valid email"
        },
        custom: {
            options: async (value) => {
                const emailCheck = await prisma.user.findUnique({
                    where: {email: value},
                })

                if(emailCheck){
                    throw new Error('This email is already taken');
                }
                return true;
            }
        }
    },
    name:{
        in:["body"],
        isLength:{
            options: {max: 50},
            errorMessage: "This name is too long",
        }
    },
    password:{
        in: ["body"],
        isLength:{
            options: {min: 8},
            errorMessage: "The password must be at least 8 characters long",
        },
        isStrongPassword: {
            options: {
                minLength: 8,
                minUppercase: 1,
                minLowercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            },
            errorMessage: "Password not strong enough",
        }

    }
}

module.exports = {
    registerBody,
}