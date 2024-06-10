require('dotenv').config();
const prisma = require('../prisma/prismaClient.js');

//utils
const { hashPassword, comparePassword } = require('../utils.js');

//middlewares
const { generateToken } = require('../middlewares/auth.js');


const register = async (req, res, next) => {
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


const login = async (req, res, next) => {
    const { email, password } = req.body;

    try{
        const user = await prisma.user.findUnique({
            where: {email: email},
        });
    
        if(!user) throw new Error ("This email does not match any of our records");   
    
        const checkPassword = await comparePassword(password, user.password);
    
        if(!checkPassword) throw new Error ("Wrong Password");
    
    
        const token = generateToken(user);
        res.json({
            token,
            user: {
                email: user.email,
                name: user.name || "User",
            }
        })
    }catch(err){
        next(err);
    }

    
}

module.exports = {
    register,
    login
}