const { checkSchema, validationResult } = require('express-validator');

module.exports = (schema) => {
    return [
        //function that checks our validation schema
        checkSchema(schema),
        //middleware that returns errors passed by validationResult and stops the execution
        (req, res, next) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(422).json({
                    errors: errors.array()
                });
            }
            next();
        }
    ]
}