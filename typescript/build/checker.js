const crypt = require ('./cryptography');

function startPt () {

    const plainTextPw = "hello world";
    const initialHash = crypt.hashPassword (plainTextPw);
    const salted = crypt.addSalt (initialHash);
    console.log (crypt.hashPassword (salted));

}

startPt ();