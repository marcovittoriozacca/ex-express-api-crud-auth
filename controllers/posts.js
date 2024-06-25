const { makeSlug } = require('../utils.js');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const store = async (req, res, next) => {

    // const userId = req.user.id;

    const {title, content, published, categoryId, tags} = req.body;
    let slug = makeSlug(title);
    try{
        let allSlugs = await prisma.post.findMany({
            select: {
                slug: true,
            }
        });
        allSlugs = allSlugs.map(e => e.slug);

        let baseSlug = slug;
        let counter = 1;
        while(allSlugs.includes(slug)){
            slug = `${baseSlug}-${counter}`;
            counter++;
        }

    }catch(err){
        return next(err);
    }

    const data = {
        title,
        slug,
        image: `posts_pic/${req.file.filename}`,
        content,
        published: published === 'true'? true : false,
        categoryId: parseInt(categoryId),
        // userId,
        tags: {
            connect: tags.map(i => ({id: parseInt(i)}))
        }
    };
    
    try{
        const nPost = await prisma.post.create({data})
        res.status(200).json({
            status: 200,
            success: true,
            post_created: nPost,
        });
    }catch(err){
        next(err);
    }

}

const show = async (req, res, next) => {
    const { slug } = req.params;

    try{
        const fPost = await prisma.post.findUnique({
            where: {
                slug: slug
            },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                tags: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
            },
        })
        return res.status(200).json({
        status: 200,
        success: true,
        post: fPost,
    });
    }catch(err){
        next(err)
    }


}

const index = async (req, res, next) => {

    const { page = 1, limit = 10, available } = req.query;

    let { published, word } = req.query;

    if(published === 'true'){
        published = true;
    }else if(published === 'false'){
        published = false;
    }else{
        published = undefined
    }

    let where = {
        AND: [
            {
                published: published,
            },
            {
                OR:[
                    {title: {contains: word}},
                    {content: {contains: word}}
                ],
            }
        ]
    }

    const totalItems = await prisma.post.count({ where });
    const totalPages = Math.ceil(totalItems / limit);
    const offset = (page - 1) * limit;
    try{
        if(page > totalPages || page <= 0 || isNaN(page)){
            return res.status(404).json({
                error: `The page you're looking for doesn't exist: Here's the total amount of pages: ${totalPages}`
            });
        }

        const postsList = await prisma.post.findMany({
            where,
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                tags: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
            },
            take: parseInt(limit),
            skip: offset,
            orderBy: {
                createdAt: 'desc',
              },
        })

        let count = parseInt(postsList.length);
        if(count === 0){
            return res.status(404).json({
                status:404,
                success: false,
                count, 
                message: "No posts found"
            })
        } 

        return res.status(200).json({
            status:200,
            success: true,
            postsList,
            totalPages,
            currentPage: parseInt(page),
            totalItems
        })


    }catch(err){
        next(err);
    }

}

const postsByTag = async (req, res, next) => {
    const {id} = req.params;
    
    try{
    const postsByTag = await prisma.post.findMany({
        where:{
            tags:{
                some:{
                    id: parseInt(id),
                }
            }
        },
        include: {
            category: {
                select: {
                    id: true,
                    name: true,
                }
            },
            tags: {
                select: {
                    id: true,
                    name: true,
                }
            },
        },
        orderBy: {
            createdAt: 'desc',
        },

    })

    const tag = await prisma.tag.findUnique({
        where:{id: parseInt(id)}
    })

    res.json({
        status: 200,
        success: true,
        posts: postsByTag,
        tag: tag.name
    })

    }catch(err){
        return next(err);
    }
}


const update = async (req, res, next) => {
    let { slug } = req.params;

    let {title, image, content, published, categoryId, tags} = req.body;

    published = published === "true"? true : false,
    categoryId = parseInt(categoryId);
    tags = tags.map(t => parseInt(t));

    let uniqueSlug = makeSlug(title);
    try{
        let allSlugs = await prisma.post.findMany({
            where:{slug: uniqueSlug},
            select: {
                slug: true,
            },
        });
        if(allSlugs.length > 1){
            allSlugs = allSlugs.map(e => e.slug);
    
            let baseSlug = uniqueSlug;
            let counter = 1;
            while(allSlugs.includes(uniqueSlug)){
                uniqueSlug = `${baseSlug}-${counter}`;
                counter++;
            }
        }
    }catch(err){
        console.error(err);
    }



    const data = {
        title,
        slug: uniqueSlug,
        image,
        content,
        published,
        categoryId,
        tags: {
            set: tags.map(i => ({id: i}))
        }
    };

    try{
        const upPost = await prisma.post.update({
            where: {
                slug: slug
            },
            data: data
        });
        res.json({
            status:200,
            success: true,
            updated_post: upPost
        });
    }catch(err){
        next(err);
    }


}

const destroy = async (req, res, next) => {
    const { slug } = req.params;

    try{
        const dPost = await prisma.post.delete({
            where: {
                slug: slug
            }
        })
    
        return res.status(200).json({
            status: 200,
            success: true,
            post_deleted: dPost,
        });
    }catch(err){
        next(err);
    }


}

module.exports = {
    store,
    show,
    index,
    update,
    destroy,
    postsByTag
}