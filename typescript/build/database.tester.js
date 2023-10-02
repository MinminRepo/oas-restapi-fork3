"use strict";
const db = require('../../typescript/build/database');
async function mainFn() {
    const sql = "SELECT * FROM applicant_userdata LIMIT 10;";
    const pipe = await db.getPoolTunnel();
    const result = await db.queryDatabase(sql, [], pipe);
    console.log(result);
}
mainFn();
//# sourceMappingURL=database.tester.js.map