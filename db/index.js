const pool = require("./pool");

async function insertUser (fullName, username, password) {
    try {
        await pool.query("INSERT INTO users (full_name, username, password) VALUES ($1, $2, $3)", [
            fullName,
            username,
            password,
        ]);
    } catch (err) {
        console.log("Failed to insert user:", err);
        throw err;
    }
}
u
async function makeMember(id) {
    try {
        await pool.query("UPDATE users SET is_member = true WHERE id = $1;", [id]);
    } catch (err) {
        console.log("Failed to make the user member:", err);
        throw err;
    }
}

async function insertMessage(userId, title, body) {
    try {
        await pool.query("INSERT INTO messages (user_id, title, body) VALUES ($1. $2. $3);", [
            userId,
            title, 
            body,
        ]);
    } catch (err) {
        console.log(err);
    }
}

async function getMessages(isMember) {
    try {
        if(isMember) {
            const { rows } = await pool.query("SELECT messages.id AS id, messages.title AS title, messages.body AS body, users.username AS author, messages.timestamp as time FROM messages JOIN users ON messages.user_id = users.id;");
            return rows
        }
        const { rows } = await pool.query("SELECT id, title, body FROM messages;");
        return rows
    } catch (err) {
        console.log("Failed to get the messages:", err);
        throw err;
    }
}

async function deleteMessage(id) {
    try {
        await pool.query("DELETE FROM messages WHERE id = $1", [id]);
    } catch (err) {
        console.log(err);
    }
}

async function makeAdmin(id) {
    try {
        await pool.query("UPDATE users SET is_admin = true WHERE id = $1", [id]);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    insertUser,
    makeMember,
    insertMessage,
    getMessages,
    deleteMessage,
    makeAdmin,
};