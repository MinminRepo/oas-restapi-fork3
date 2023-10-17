"use strict";
const crypt = require('../../build/modules/cryptography');
const db = require('../../build/modules/database');
module.exports.accountLogin = async (req, res) => {
    try {
        const username = req.body.username;
        const password = crypt.hashPassword(crypt.addSalt(req.body.password));
        const result = await db.verifyDBCredentials(username, password);
        if (result.length === 1) {
            res.status(200).json({ status: 200, message: "Request OK." });
        }
        else {
            res.status(401).json({ status: 401, message: "Unauthorized, no account found." });
        }
    }
    catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    }
    finally {
        res.end();
    }
};
