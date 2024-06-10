const prisma = require('../prisma/prismaClient.js');

const checkUser = async (req, res, next) => {

    const { id } = req.user;
    const { slug } = req.params;
    try{
        const postCheck = await prisma.post.findUnique({
            where: {slug},
        })
        const postUserId = postCheck.userId;
        
        if(postUserId != id){
            throw new Error ("This post doesn't belong to you. You cant modify it");
        }

        return next();
    }catch(err){
        next(err)
    }


}

module.exports = {
    checkUser,
}