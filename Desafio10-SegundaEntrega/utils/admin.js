module.exports = (req, res, next) => {
    console.log(req.get('admin'));
    next();
}