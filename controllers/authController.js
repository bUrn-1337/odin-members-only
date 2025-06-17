const { body, validationResult } = require("express-validator");
const alphaErr = "must only contain letters.";

const { insertUser } = require("../db/index");

const validateUser = [
    body("username").trim()
        .isAlpha().withMessage(`username ${alphaErr}`),
    body("password").trim()
        .isAlpha().withMessage(`password ${alphaErr}`),
    body("fullName")    
        .isAlpha().withMessage(`full name ${alphaErr}`),
    body("passwordConfirmation").custom((value, { req }) => {
        return value === req.body.password;
    }).withMessage("the passwords don't match"),
];

exports.getRegister = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/");
    }
    res.render("register");
};

exports.getLogin = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/");
    }
    res.render("login");
};

exports.postRegister = [
    validateUser,
    async (req, res, next) => {
        if (!req.isAuthenticated()) {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).render("createUser", {
                    title: "Create user",
                    errors: errors.array(),
                });
            }
            const { fullName, username, password } = req.body;
            try {
                await insertUser(fullName, username, password);
                res.redirect("/login");
            } catch (err) {
                next(err);
            }
        }
    }
];

exports.postLogin = (req, res) => {
    if (!req.isAuthenticated()) {
        passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/"
        });
    }
};