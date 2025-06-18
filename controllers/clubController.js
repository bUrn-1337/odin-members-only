const { makeMember } = require("../db/index");

exports.getJoinClub = (req, res) => {
    return res.render("join-club");
}

exports.postJoinClub = async (req, res) => {
    const { passcode } = req.body;
    const id = req.user.id;
    if( passcode != "topsecretpassword") {
        return res.render("join-club", {error: "The passcode is wrong"});
    }
    await makeMember(id);
    return res.redirect("/");
}