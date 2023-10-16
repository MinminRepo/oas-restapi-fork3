const crypt = require ('../../typescript/build/modules/cryptography');

describe ("cryptography.js test file", () => {

    let initialValues = {
        initialHash: "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9",
        expectedSalt: "c484efe37a5380ee9088f7ace2efcde9b94d27b9934d3e08a52e52d7da7dabfaJzt66UmwmV?UM^sX7AVkQF_3GxprS4zK",
        expectedHash: "1316d15ce228f94f05318f4f56b71e85895fdd76e379978d776a985d93783592"
    };

    it ("Test file properly loads", () => {
        /** auto-pass */
    });

    it ("Properly salts the given password ('hello world' in plaintext)", () => {
        expect (crypt.addSalt (initialValues.initialHash)).toEqual (initialValues.expectedSalt);
    });

    it ("Properly hashes the password ('hello world' in plaintext)", () => {
        expect (crypt.hashPassword (crypt.addSalt (initialValues.initialHash))).toEqual (initialValues.expectedHash);      
    });

});