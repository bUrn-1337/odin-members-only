const { makeAdmin } = require("../db/index");

exports.getBecomeAdmin = (req, res) => {
    return res.render("become-admin", {
        msg : ""
    });
}

exports.postBecomeAdmin = async (req, res) => {
    const { passcode } = req.body;
    const id = req.user.id;
    if (passcode != "iamtheadmin") {
        return res.render("become-admin", {
            msg: "The pass code is wrong"
        });
    }
    await makeAdmin(id);
    return res.redirect("/");
}