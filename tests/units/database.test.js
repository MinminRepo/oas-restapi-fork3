const testObj = require ('../../typescript/build/modules/database');

describe ("Database module test file", () => {

    it ("Test file properly loaded", () => {
        /** autopass */
    });

    it ("Properly retrieves data from a database", async () => {

        const key = 2024000001;
        const result = await testObj.retrieve (key);
        
        /** check for at least 1 record */
        expect (result.length).toBe(1);

        /** check for the presence of the applicant no */
        expect (result[0]).toMatchObject ({
            applicant_no: key
        });;

    });



});