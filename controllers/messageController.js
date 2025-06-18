const { insertMessage, deleteMessage } = require("../db/index");

exports.getCreateMessage = (req, res) => {
    return res.render("make-message", {msg : ""});
}

exports.postCreateMessage = async (req, res) => {
    const { title, body } = req.body;
    const userId = req.user.id;
    await insertMessage(userId, title, body);
    return render("make-message", {msg : "success!"});
}

exports.postDeleteMessage = async (req, res) => {
    const {id} = req.body;
    await deleteMessage(id);
    
}