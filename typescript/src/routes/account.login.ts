/** authentication requirements */
const crypt = require('../../build/modules/cryptography');
const db = require('../../build/modules/database');

module.exports.accountLogin = async (req: any, res: any) => {
    /**
     * Documentation:
     * 
     * Requirements: 
     * username as string, password as pre-hashed string in SHA256.
     * 
     * Process: 
     * 1. The user supplies the username and pre-hashed password from the front-end.
     * 2. The API will salt and hash the password.
     * 3. The API will query the database using the username and the output from item #2.
     * 4. The API will check for the length of the resulting query. If the length is 1,
     * then an account was found. 
     * 5. If the length is 1, issue a JSON Web Token (JWT) derived from the resulting object from
     * the query.
     * 6. Send the JWT together with a status code of 200 to the client.
     * 7. On system errors, send a 500 status code.
     * 8. Send a 401 status code if the result from the query has a length of 0.
     * 
     */

    try {

        const username = req.body.username;
        const password = crypt.hashPassword(crypt.addSalt(req.body.password));
        const result = await db.verifyDBCredentials(username, password);

        if (result.length === 1) {
            res.status(200).json({ status: 200, message: "Request OK." });
        } else {
            res.status(401).json({ status: 401, message: "Unauthorized, no account found." });
        }

    } catch (err: any) {
        res.status(500).json({ status: 500, message: err.message });
    } finally {
        res.end();
    }

}