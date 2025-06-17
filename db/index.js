const pool = require("./pool");

async function insertUser (fullName, username, password) {
    pool.query("INSERT INTO users (full_name, username, password) VALUES ($1, $2, $3)", [
        fullName,
        username,
        password,
    ]);
}

module.exports = {
    insertUser,
};