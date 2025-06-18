const { getMessages } = require("../db/index");
exports.index = async (req, res) => {
    const isMember = req.user.is_member;
    const messages = await getMessages(isMember);
    res.render("index", messages);
}