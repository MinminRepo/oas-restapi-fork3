const UpdateBuilder = require ('../../typescript/build/Class.UpdateBuilder');
const testObj = new UpdateBuilder ("application_data");

describe ("Update Querybuilder test file", () => {
    it ("Test file properly loaded", () => {
        /** autopass */
    });

    it ("Properly builds the update query", async () => {

        const expectedQueryString = "UPDATE application_data SET col1 = ?, col2 = ?, col3 = ? WHERE applicant_no = ?;";
        const expectedArgs = ['my_username', 'my_password', 'myemail@gmail.com', 2024123456];

        testObj.setTargetUser (2024123456);
        testObj.addParameter ('col1', 'my_username');
        testObj.addParameter ('col2', 'my_password');
        testObj.addParameter ('col3', 'myemail@gmail.com');

        /** positive test case */
        expect (testObj.build ().queryString).toEqual (expectedQueryString);
        expect (testObj.build ().paramArr).toEqual (expectedArgs);

        /** returns an error on malformed inputs */
        testObj.clearParameters ();
        expect (() => testObj.setTargetUser ("")).toThrow(Error);
        expect (() => testObj.setTargetUser (1234)).toThrow(Error);

        /** expect an error when building the wuery with no parameters set */
        testObj.clearParameters ();
        expect (() => testObj.build ()).toThrow(Error);

    });
});