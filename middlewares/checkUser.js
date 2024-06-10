const prisma = require('../prisma/prismaClient.js');

const checkUser = async (req, res, next) => {

    const { id } = req.user;
    const { slug } = req.params;
    try{
        const postCheck = await prisma.post.findUnique({
            where: {slug},
        })
        if(!postCheck) return res.status(404).json({status:404, error:"This post doesnt exist"})
        
        const postUserId = postCheck.userId;
        
        if(postUserId != id){
            return res.status(403).json({
                status: 403,
                error: "This post doesnt belongs to you. You cant modify it"
            });
        }

        return next();
    }catch(err){
        next(err)
    }


}

module.exports = {
    checkUser,
}