const { insertMessage, deleteMessage } = require("../db/index");

exports.getCreateMessage = (req, res) => {
    return res.render("make-message", {msg : ""});
}

exports.postCreateMessage = async (req, res) => {
    const { title, body } = req.body;
    const userId = req.user.id;
    await insertMessage(userId, title, body);
    return res.render("make-message", {msg : "success!"});
}

exports.postDeleteMessage = async (req, res) => {
    try {
        const { id } = req.body;
        await deleteMessage(id);
        res.status(200).send("Deleted");
    } catch (err) {
        console.error("Error in postDeleteMessage:", err);
        res.status(500).send("Error deleting message");
    }
};
