const db = require('../config/db');
const crypto = require('crypto');

module.exports = {
    'isUser': async function (username) {
        let conn = await db.getConnection();
        const result = await conn.query("select user_id from user where username = ?", [username]);
        conn.end();
        return result.length > 0;
    },
    'addUser': async function (username, email, password) {
        if (!this.isUser(username)) {
            let conn = await db.getConnection();
            //hash the password
            //(sha256 "hasher")
            // update generates a hash "object"
            //digest outputs it to a value
            const passHash = (crypto.createHash('sha256')).update(password).digest('base64');
            const result = await conn.query('insert into user (username, email, passHash) values (?,?,?)', [username, email, passHash]);
            let status = conn.end();
            return result;
        } else {
            return false;
        }
    }
};