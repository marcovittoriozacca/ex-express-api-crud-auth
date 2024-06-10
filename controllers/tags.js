const prisma = require('../prisma/prismaClient.js');

const store = async (req, res, next) => {

    const { name } = req.body;

    try{
        const newTag = await prisma.tag.create({data:{name}});
        res.json({
            status:200,
            success:true,
            new_tag: newTag
        });
    }catch(err){
        next(err);
    }
}

const index = async (req, res, next) => {

    try{
        const allTags = await prisma.tag.findMany();
        res.json({
            status:200,
            success:true,
            tags: allTags
        });
    }catch(err){
        next(err);
    }
}

const show = async (req, res, next) => {
    const id = parseInt(req.params.id);

    try{
        const tagToShow = await prisma.tag.findUnique({
            where: {id}
        })
        
        res.json({
            status:200,
            success:true,
            tag_to_show: tagToShow
        });
    }catch(err){
        next(err);
    }
}

const update = async (req, res, next) => {
    const id = parseInt(req.params.id);

    const { name } = req.body;

    try{
        const tagToUpdate = await prisma.tag.update({
            where: {id},
            data: {name}
        })
        res.json({
            status:200,
            success:true,
            updated_tag: tagToUpdate
        });
    }catch(err){
        next(err);
    }
}

const destroy = async (req, res, next) => {
    const id = parseInt(req.params.id);
    try{
        const tagToDelete = await prisma.tag.delete({
            where: {id}
        });
        res.json({
            status:200,
            success:true,
            deleted_tag: tagToDelete,
            message: "Deleted successfully"
        });
    }catch(err){
        next(err);
    }
}
module.exports = {
    store,
    index,
    show,
    update,
    destroy
}