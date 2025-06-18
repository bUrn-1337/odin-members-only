const { insertMessage } = require("../db/index");

exports.getCreateMessage = (req, res) => {
    return res.render("make-message", {msg : ""});
}

exports.postCreateMessage = async (req, res) => {
    const { title, body } = req.body;
    const userId = req.user.user_id;
    await insertMessage(userId, title, body);
    return render("make-message", {msg : "success!"});
}