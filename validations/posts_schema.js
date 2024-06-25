const prisma = require('../prisma/prismaClient.js');

const passedBody = {
   title: {
    in: ['body'],
    notEmpty:{
      errorMessage: "The title is a required field"  
    },
    isString:{
        errorMessage: "The title must be a String"
    },
    isLength:{
        options: {min:1},
        errorMessage: "The length of this title is too short"
    },
    isLength:{
        options: {max:100},
        errorMessage: "The length of this title is too long - max length is 100 chars"
    }
    
   },
   content:{
    in: ['body'],
    notEmpty:{
        errorMessage: "The content is a required field"  
      },
      isString:{
          errorMessage: "The content must be a String"
      },
      isLength:{
          options: {min:1},
          errorMessage: "The length of this content is too short"
      },
   },
   published:{
    in: ['body'],
    notEmpty:{
        errorMessage: "You must specify if this post is already published or not"
    },
    isBoolean:{
        errorMessage: "This field only accepts true or false"
    }
   },
   categoryId:{
    in: ['body'],
    isInt:{
        options: {allow_leading_zeroes: false},
        errorMessage: "The category ID must be an integer"
    },
    custom: {
        options: async (value) => {
            if(value === undefined){
                return true;
            }
            const categoryId = parseInt(value);
            const matchingId = await prisma.category.findUnique({
                where: {id: categoryId}
            });
            if(!matchingId){
                throw new Error(`There's no ID as ${categoryId}.`)
            }
            return true;
        }
    }
   },
   tags:{
    notEmpty:{
    errorMessage: "You must include at least one tag"
    },
    isArray:{
        errorMessage: "Tags must be passed as array of one or multiple ID"
    },
    custom:{
        options: async (values) => {
            if(values.length === 0){
                return true;
            }
            const ids = values.map(id => parseInt(id));

            const checkIds = ids.find(i => isNaN(parseInt(i)));
            if(checkIds){
                throw new Error ("One or more IDs are not integers")
            }else{

                const tagsIds = await prisma.tag.findMany({
                    where: {id: {in: ids}}
                })
                if(tagsIds.length < values.length){
                    throw new Error('One or more of the passed IDs are not present in the database.')
                }
                return true;
            }

        }
    }
   }

}

const postsSlug = {
    slug:{
        in: ['params'],
        custom:{
            options: async (value) => {
                const parsedSlug = String(value);
                const matchSlug = await prisma.post.findUnique({
                    where: {slug: parsedSlug}
                })
                if(!matchSlug){
                    throw new Error(`There's no post with slug: ${parsedSlug}`);
                }
                return true;
            }
        }
    },
}

module.exports = {
    passedBody,
    postsSlug
}