const { hashPassword } = require('../utils.js');
require('dotenv').config();
const prisma = require('../prisma/prismaClient.js');
const { generateToken } = require('../middlewares/auth.js');


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

        const token = generateToken(storeUser);

        res.json({
            token,
            user: {
                email: storeUser.email,
                name: storeUser.name || "User",
            }
        })

    }catch(err){
        next(err);
    }

    
}

module.exports = {
    store
}