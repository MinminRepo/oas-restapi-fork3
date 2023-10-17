"use strict";
require('dotenv').config();
const c = require('node:crypto');
module.exports.addSalt = (initialHash) => {
    if (initialHash.length !== 64) {
        throw new Error(`Initial hash length is not equal to 64 characters, got ${initialHash.length}`);
    }
    else {
        const left = initialHash.substring(0, 32);
        const right = initialHash.substring(32);
        return `${right}${left}${process.env.CRYPT_SALT}`;
    }
};
module.exports.hashPassword = (plainTextString) => {
    try {
        const hashed = c
            .createHash(process.env.CRYPT_HASH_ALGO)
            .update(plainTextString)
            .digest(process.env.CRYPT_DIGEST_MODE)
            .toString();
        return hashed;
    }
    catch (err) {
        throw new Error(err.message);
    }
};
