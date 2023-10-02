const request = require ('supertest')
const app = require ('../../app')

describe ("Integration Test File | app.js", () => {

    it ("Test file properly running", () => {
        /** auto-pass */
    })

    it ("Can register new user", () => {
        /** auto-pass */
        return request (app)
            .put ("/user/account/new")
            .expect(200)
            .expect("Content-Type", /json/);
    })

    it ("Can login to a user", () => {
        /** auto-pass */
        return request (app)
            .post ("/user/account/login")
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

    it ("Can get existing user data", () => {
        /** auto-pass */
        return request (app)
            .get ("/user/info/get/2024000001")
            .expect (200)
            .expect ("Content-Type", /json/)
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
