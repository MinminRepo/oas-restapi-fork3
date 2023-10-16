"use strict";
module.exports = class UpdateBuilder {
    constructor(table) {
        this.parameters = [];
        this.targetTable = "";
        this.targetUser = 0;
        this.targetTable = table;
    }
    setTargetUser(id) {
        if (typeof id !== 'number')
            throw new Error("id parameter must be a number");
        if (id < 2024000000)
            throw new Error("id format invalid");
        this.targetUser = id;
    }
    addParameter(columnName, value) {
        this.parameters.push([columnName, value]);
    }
    removeParameter(columnName) {
        this.parameters = this.parameters.filter((item) => {
            return item[0] !== columnName;
        });
    }
    clearParameters() {
        this.parameters = [];
    }
    build() {
        let queryString = "";
        let placeHolders = "";
        let actualValues = [];
        if (this.parameters.length === 0) {
            throw new Error("Cannot build UPDATE querystring, no parameters specified.");
        }
        else if (this.targetUser === 0) {
            throw new Error("Target user must be defined by calling setTargetUser(id).");
        }
        else {
            queryString += `UPDATE ${this.targetTable} SET `;
            for (let i = 0; i < this.parameters.length; i++) {
                if (i === this.parameters.length - 1) {
                    queryString += `${this.parameters[i][0]} = ?`;
                }
                else {
                    queryString += `${this.parameters[i][0]} = ?, `;
                }
                actualValues.push(this.parameters[i][1]);
            }
            queryString += ` WHERE applicant_no = ?;`;
            actualValues.push(this.targetUser);
        }
        return {
            queryString: queryString,
            paramArr: actualValues,
        };
    }
};
