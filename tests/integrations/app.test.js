const request = require ('supertest')
const app = require ('../../app')
const crypto = require ('crypto');

describe ("Integration Test File | app.js", () => {

    it ("Test file properly running", () => {
        /** auto-pass */
    })

    it ("Properly resolves favicon.ico requests", () => {
        return request (app)
            .get ('/favicon.ico')
            .expect(204);
    })

    it ("Can register new user", () => {
        /** auto-pass */
        return request (app)
            .put ("/user/account/new")
            .expect(200)
            .expect("Content-Type", /json/);
    })

    it ("Authenticates a verified user", () => {
        /** auto-pass */
        return request (app)
            .post ("/user/account/login")
            .send({
                username: 'IMTHEPAPERCAT@GMAIL.COM',
                password: crypto.createHash('sha256').update('1234567890').digest('hex').toString(),
            })
            .expect(200)
            .expect("Content-Type", /json/);
    })

    

    it ("Can logout", () => {
        /** auto-pass */
        return request (app)
            .post ("/user/account/logout")
            .expect(200)
            .expect("Content-Type", /json/);
    })

    it ("Can get existing user data", async () => {
        /** auto-pass */
        await request (app)
            .get ("/user/info/get/2024000001")
            .expect (200)
            .expect ("Content-Type", /json/)
            .then ((result) => {
                expect (result.body).toMatchObject ({
                    status: 200,
                    message: expect.any (String),
                    data: expect.objectContaining({
                        applicant_no: expect.any (Number)
                    })
                });
            });
    })

    it ("Can update existing information", () => {
        /** auto-pass */
        return request (app)
            .post ("/user/info/update")
            .expect(200)
            .expect("Content-Type", /json/);
    });

    it ("Can finalize account", () => {
        /** auto-pass */
        return request (app)
            .post ("/user/info/finalize")
            .expect(200)
            .expect("Content-Type", /json/);
    });

    it ("Can revoke user information", () => {
        return request (app)
            .delete ("/user/info/revoke")
            .expect(200)
            .expect("Content-Type", /json/);
    });

    it ("Can upload documents", () => {
        return request (app)
            .put ("/user/info/upload")
            .expect(200)
            .expect("Content-Type", /json/);
    });

});

/** negative test cases ==================================================== */
describe ("Negative Cases:", () => {
    it ("Test file properly running", () => {
        /** auto pass */
    })

    it ("Properly responds with 404 on non-existent accounts", async () => {
        await request (app)
            .get ("/user/info/get/9999999999")
            .expect (404)
            .expect ("Content-Type", /json/);
    })

    it ("Disallows non-existent users from authenticating", () => {
        /** auto-pass */
        return request (app)
            .post ("/user/account/login")
            .send({
                username: 'IDONOTEXIST@GMAIL.COM',
                password: crypto.createHash('sha256').update('IAMABADPASSWORD').digest('hex').toString(),
            })
            .expect(401)
            .expect("Content-Type", /json/);
    })
});
