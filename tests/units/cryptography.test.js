const crypt = require ('../../typescript/build/cryptography');

describe ("cryptography.js test file", () => {

    it ("Test file properly loads", () => {
        /** auto-pass */
    });

    it ("Properly salts the given password ('hello world' in plaintext)", () => {

        /** sha256 representation of the string "hello world" */
        const initialHash = "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9";
        const expectedOutput = `c484efe37a5380ee9088f7ace2efcde9b94d27b9934d3e08a52e52d7da7dabfaJzt66UmwmV?UM^sX7AVkQF_3GxprS4zK`;

        const testOutput = 

        expect (crypt.addSalt (initialHash)).toEqual (expectedOutput);
    });

    it ("Properly hashes the password ('hello world' in plaintext)", () => {

        const initialHash = "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9";
        const expectedOutput = "1316d15ce228f94f05318f4f56b71e85895fdd76e379978d776a985d93783592";

        expect (crypt.hashPassword (crypt.addSalt (initialHash))).toEqual (expectedOutput);      
    });

})