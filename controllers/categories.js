const prisma = require('../prisma/prismaClient.js');

const index = async (req, res, next) => {

    try{
        const allCategories = await prisma.category.findMany()
        
        res.json({
            status:200,
            success:true,
            categories: allCategories
        })
    }catch(err){
        return next(err);
    }
    

}

const store = async (req, res, next) => {
    const { name } = req.body;

    try{
        const newCategory = await prisma.category.create({data: {name}})
        
        res.json({
            status:200,
            success:true,
            new_category: newCategory
        })
    }catch(err){
        return next(err);
    }
    

}

const show = async (req, res, next) => {
    const id = parseInt(req.params.id);

    try{
        const categoryToShow = await prisma.category.findUnique({
            where: {id}
        })
        res.json({
            status:200,
            success:true,
            category: categoryToShow
        })
    }catch(err){
        return next(err);
    }
}

const update = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    try{
        const categoryToUpdate = await prisma.category.update({
            where: {id},
            data: {name},
        });
        return res.json({
            status:200,
            success:true,
            updated_category: categoryToUpdate
        });
    }catch(err){
        return next(err);
    }
}

const destroy = async (req, res, next) => {
    const id = parseInt(req.params.id);
    try{
        const categoryToDelete = await prisma.category.delete({
            where: {id}
        });
        return res.json({
            status:200,
            success:true,
            deleted_category: categoryToDelete
        });
    }catch(err){
        next(err);
    }
}


module.exports = {
    index,
    store,
    show,
    update,
    destroy
}