const fs = require('fs/promises')

/**
 * This function checks if the specified file is existing 
 * in the hard disk.
 * 0 = check only existing
 * 1 = check if readable
 * 2 = check if writable
 */
module.exports.peek = async (filePath: string, peekMode: Number = 0): Promise<boolean | Error> => {

    return new Promise(async (resolve, reject) => {
        let mode = 0;
        switch (peekMode) {
            case 0: mode = fs.constants.F_OK; break;
            case 1: mode = fs.constants.R_OK; break;
            case 2: mode = fs.constants.W_OK; break;
            default: mode = fs.constants.F_OK; break;
        }

        try {
            const isOK = await fs.access(filePath, fs.constants.F_OK);
            resolve(true);
        } catch (err: any) {
            reject(new RangeError(err.message));
        }
    });

}


module.exports.read = async (filePath: string, encoding: string = 'utf8'): Promise<string> => {

    return new Promise(async (resolve, reject) => {
        try {
            const data: string = await fs.readFile(filePath, { encoding: encoding })
            resolve(data);
        } catch (err: any) {
            reject(new RangeError(err.message));
        }
    });

}

module.exports.append = async (filePath: string, data: string): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data === "") {
                reject(new Error("Trying to append an empty string to file."));
            } else {
                await fs.appendFile(filePath, (data + '\n'));
                resolve(true);
            }
        } catch (err: any) {
            reject(new Error(err.message));
        }
    });
}

module.exports.move = async (srcFile: string, destPath: string): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        try {
            await fs.rename(srcFile, destPath);
            resolve(true);
        } catch (err: any) {
            reject(new Error(err.message));
        }
    });
}