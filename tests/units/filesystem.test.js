require ('dotenv').config ();
const path = require ('path');
const fs = require ("fs/promises");
const testObj = require ('../../typescript/build/filesystem');

describe ("Checks if filesystem functions are working", () => {

    const mockFilePath = path.join (process.env.API_BASEPATH, '/mockfile.txt');
    const destFilePath = path.join (process.env.API_BASEPATH, '/tests/units/mockfile.txt');

    beforeAll (async () => {
        /** create a mock file here */
        const file = await fs.open (mockFilePath, 'w');
        await fs.appendFile (mockFilePath, 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.\n', 'utf-8');
    });

    afterAll (async () => {
        /** delete the mockfile */
        await fs.unlink (destFilePath);
    });




    it ("Test file properly running", () => {
        /** auto pass */
    })

    it ("Properly peeks the filesystem", async () => {
        await expect(testObj.peek(mockFilePath, 0))
            .resolves.toBe (true);
    });

    it ("Returns an Error object if peeking non-existent files", async () => {
        await expect(testObj.peek ('/non/existent/file.txt', 0))
            .rejects.toThrow (RangeError);
    });

    it ("Properly reads the file contents", async () => {
        await expect (testObj.read(mockFilePath, 'utf8'))
            .resolves.toBe("THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.\n");
    });

    it ("Returns an Error object if trying to read a non-existent file", async () => {
        await expect(testObj.read ('/non/existent/file.txt', 0))
            .rejects.toThrow (RangeError);
    });

    it ("Properly appends content to the file", async () => {
        await expect(testObj.append(mockFilePath, 'DUMMY_STRING'))
            .resolves.toBe (true);
    });

    it ("Returns an Error object if trying to append to a non-existent file", async () => {

        /** test on a non-existent file */
        await expect (testObj.append ('/some/missing/file.txt', ""))
            .rejects.toThrow (Error);

        /** test on an existing file but no data to append */
        await expect (testObj.append (mockFilePath, ""))
            .rejects.toThrow (Error("Trying to append an empty string to file."));
    });

    it ("Properly moves the file location to another", async () => {
        await expect (testObj.move (mockFilePath, destFilePath)).resolves.toBe (true);
    });

})