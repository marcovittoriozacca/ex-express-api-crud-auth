const prisma = require('../prisma/prismaClient.js');
const categoriesId = {
    id:{
        in: ['params'],
        isInt: {
            errorMessage: "The ID must be an integer"
        },
        custom:{
            options: async (value) => {
                const parsedID = parseInt(value);
                const matchId = await prisma.category.findUnique({
                    where: {id: parsedID}
                })
                if(!matchId){
                    throw new Error(`There's no ID as ${parsedID}`);
                }
                return true;
            }
        }
    },
}

const tagsId = {
    id:{
        in: ['params'],
        isInt: {
            errorMessage: "The ID must be an integer"
        },
        custom:{
            options: async (value) => {
                const parsedID = parseInt(value);
                const matchId = await prisma.tag.findUnique({
                    where: {id: parsedID}
                })
                if(!matchId){
                    throw new Error(`There's no ID as ${parsedID}`);
                }
                return true;
            }
        }
    },
}

module.exports = {
    categoriesId,
    tagsId
}