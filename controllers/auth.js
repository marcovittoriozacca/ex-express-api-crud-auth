const { hashPassword } = require('../utils.js');
require('dotenv').config();
const prisma = require('../prisma/prismaClient.js');


const store = async (req, res, next) => {
    const { email, name, password } = req.body;
    try{
        const hashedPassword = await hashPassword(password + process.env.PEPPER_KEY);
    
        const newUser = {
            email,
            name,
            password: hashedPassword,
        };

        const storeUser = await prisma.user.create({
            data: newUser,
        })

    }catch(err){
        next(err);
    }

    
}

module.exports = {
    store
}