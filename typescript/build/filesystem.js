"use strict";
const fs = require('fs/promises');
module.exports.peek = async (filePath, peekMode = 0) => {
    return new Promise(async (resolve, reject) => {
        let mode = 0;
        switch (peekMode) {
            case 0:
                mode = fs.constants.F_OK;
                break;
            case 1:
                mode = fs.constants.R_OK;
                break;
            case 2:
                mode = fs.constants.W_OK;
                break;
            default:
                mode = fs.constants.F_OK;
                break;
        }
        try {
            const isOK = await fs.access(filePath, fs.constants.F_OK);
            resolve(true);
        }
        catch (err) {
            reject(new RangeError(err.message));
        }
    });
};
module.exports.read = async (filePath, encoding = 'utf8') => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await fs.readFile(filePath, { encoding: encoding });
            resolve(data);
        }
        catch (err) {
            reject(new RangeError(err.message));
        }
    });
};
module.exports.append = async (filePath, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data === "") {
                reject(new Error("Trying to append an empty string to file."));
            }
            else {
                await fs.appendFile(filePath, (data + '\n'));
                resolve(true);
            }
        }
        catch (err) {
            reject(new Error(err.message));
        }
    });
};
module.exports.move = async (srcFile, destPath) => {
    return new Promise(async (resolve, reject) => {
        try {
            await fs.rename(srcFile, destPath);
            resolve(true);
        }
        catch (err) {
            reject(new Error(err.message));
        }
    });
};
