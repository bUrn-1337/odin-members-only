exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}

exports.ensureAdmin = (req, res, next) => {
    if (req.user && req.user.is_admin) {
        return next();
    }
    return res.status(403).send("Forbidden: You do not have permission to access this resource.");
};
