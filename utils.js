const slugify = require('slugify')

const makeSlug = (string) => {
    return slugify(string, {lower: true});
}

module.exports = {
    makeSlug
}