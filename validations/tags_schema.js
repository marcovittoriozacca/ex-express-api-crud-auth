const tagsVal = {
    name:{
        in: ['body'],
        notEmpty: {
            errorMessage: "Name is a required field"
        },
        isString:{
            errorMessage: "The Name must be a String"
        },
        isLength:{
            options: {min:1},
            errorMessage: "The length of this Name is too short"
        },
        isLength:{
            options: {max:100},
            errorMessage: "The length of this Name is too long - max length is 100 chars"
        }
    }
}

module.exports = tagsVal