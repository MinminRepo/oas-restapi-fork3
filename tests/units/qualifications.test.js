require ('dotenv').config ();
const path = require ('path');
const testObj = require ('../../typescript/build/qualifications');

describe ("Applicant qualifications test file", () => {

    it ("Test file properly loaded", () => {
        /** autopass */
    })

    it ("Checks for underheight applicants", async () => {

        /** underheight males, not IP */
        expect (testObj.checkHeight (155.0, 'MALE', false)).toBe(false);

        /** underheight males, IP */
        expect (testObj.checkHeight (155.0, 'MALE', true)).toBe(true);

        /** underheight females, not IP */
        expect (testObj.checkHeight (150.0, 'FEMALE', false)).toBe(false);

        /** underheight females, not IP */
        expect (testObj.checkHeight (150.0, 'FEMALE', true)).toBe(true);

    });

    it ("Checks for overage and underage applicants", async () => {
        expect (testObj.checkAge (new Date(2010, 2, 15))).toBe(false);
        expect (testObj.checkAge (new Date(2000, 2, 15))).toBe(false);

        expect (testObj.checkAge (new Date(2002, 7, 23))).toBe(true);
    });

    it ("Checks for non-compliant BMI Ratings", async () => {
        expect (testObj.checkBMI(18.0)).toBe (true);
        expect (testObj.checkBMI(28.0)).toBe (false);
    });

});