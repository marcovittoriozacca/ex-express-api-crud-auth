const slugify = require('slugify')
const bcrypt = require('bcrypt');

const makeSlug = (string) => {
    return slugify(string, {lower: true});
}

const hashPassword = async password => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}


module.exports = {
    makeSlug,
    hashPassword
}