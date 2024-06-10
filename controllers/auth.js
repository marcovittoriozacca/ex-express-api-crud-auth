const store = (req, res, next) => {
    const { email, name, password } = req.body;
    console.log(email, name, password);


}

module.exports = {
    store
}