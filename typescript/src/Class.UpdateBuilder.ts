module.exports = class UpdateBuilder {

    /** the parameter array 
     * when calling addParameter(col, val), the val is stored here
    */
    private parameters: any[] = [];

    /** the target table to update
     * specified using the constructor(table) function
     */
    private targetTable: string = "";

    /** the target user to update
     * specified using the setTargetUser(id) function
     */
    private targetUser: number = 0;


    /** constructor function */
    constructor(table:string) {
        this.targetTable = table;
    }

    /** sets the target user to update */
    public setTargetUser (id: number): void {

        if (typeof id !== 'number') 
            throw new Error ("id parameter must be a number");

        if (id < 2024000000)
            throw new Error ("id format invalid");
        
        this.targetUser = id;
    }

    /** adds a query parameter */
    public addParameter (columnName:string, value:any): void {
        this.parameters.push ([columnName, value]);
    }

    /** an in-case function that removes a parameter */
    public removeParameter (columnName: string): void {
        this.parameters = this.parameters.filter ((item) => {
            return item[0] !== columnName;
        });
    }

    public clearParameters (): void  {
        this.parameters = [];
    }

    /** primary function.
     * this builds the entire query and the parameter list
     */
    public build (): object {
        
        let queryString: string = "";
        let placeHolders: string = "";
        let actualValues: any[] = [];

        if (this.parameters.length === 0) {
            throw new Error ("Cannot build UPDATE querystring, no parameters specified.");
        } else if (this.targetUser === 0) {
            throw new Error ("Target user must be defined by calling setTargetUser(id).");
        } else {
            queryString += `UPDATE ${this.targetTable} SET `;

            for (let i = 0; i < this.parameters.length; i++) {
                if (i === this.parameters.length - 1) {
                    queryString += `${this.parameters[i][0]} = ?`;
                } else {
                    queryString += `${this.parameters[i][0]} = ?, `;
                }
                
                actualValues.push (this.parameters[i][1]);
            }

            queryString += ` WHERE applicant_no = ?;`;
            actualValues.push (this.targetUser);
        }

        return {
            queryString: queryString,
            paramArr: actualValues,
        };
    }   
}