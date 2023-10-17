require('dotenv').config();
const c = require('node:crypto');

/**
 * This function will salt the initial hash from the user interface
 */
module.exports.addSalt = (initialHash: string): string => {

    if (initialHash.length !== 64) {
        throw new Error(`Initial hash length is not equal to 64 characters, got ${initialHash.length}`);
    } else {

        /** splits the string into two halves */
        const left: string = initialHash.substring(0, 32);
        const right: string = initialHash.substring(32);

        /** return flipped string (right + left + salt) */
        return `${right}${left}${process.env.CRYPT_SALT}`;
    }
}

/**
 * This function hashes the given password
 */
module.exports.hashPassword = (plainTextString: string): string => {

    try {
        const hashed = c
            .createHash(process.env.CRYPT_HASH_ALGO)
            .update(plainTextString)
            .digest(process.env.CRYPT_DIGEST_MODE)
            .toString();

        return hashed;
    } catch (err: any) {
        throw new Error(err.message);
    }

} 
