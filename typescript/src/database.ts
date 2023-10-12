/** import required modules */
require('dotenv').config();
const mysql = require ('mysql');
const UpdateQueryBuilder = require ('../../typescript/build/Class.UpdateBuilder');

/** define the shape of the mysql connection options object */
type dbConfigOptions = {
    connectionLimit: number,
    host: string,
    user: string,
    password: string,
    database: string,
    port: number,
    socketPath: string
};

/** define the mysql connection options with actual values */
let mysqlOptions: dbConfigOptions = {
    connectionLimit: Number (process.env.CONNECTION_LIMIT),
    host: String (process.env.HOST),
    user: String (process.env.UNAME),
    password: String (process.env.PASSWORD),
    database: String (process.env.DATABASE),
    port: Number (process.env.PORT),
    socketPath: ""
};

/** determine connection type */
switch (process.env.CONNECT_TYPE) {
    case "SOCKET": {
        mysqlOptions.socketPath = String (process.env.SOCKET_PATH);
        break;
    }
    case "TCP": {
        // TCP will automatically connect as long as the credentials are correct.
        break;
    }
    default: {
        throw new Error ("Cannot connect to database, invalid connection type is set.\nValues must either be 'TCP' or 'UNIX SOCKET' but '${process.env.CONNECT_TYPE}' is given.");
    }
}

const connectionPool = mysql.createPool (mysqlOptions);


/** function definitions for module export ======================================== */

/**
 * This function will get a new empty connection from the pool
 * of connections
 * @returns pipe object on resolve, error on reject
 * 
 * This is not exported into modules (private function)
 */
const getPoolTunnel = async (): Promise<Error | object> => {

    return new Promise ((resolve, reject) => {
        connectionPool.getConnection ((error: Error, pipe: any) => {
            if (error)
                reject (error);
            else 
                resolve (pipe);
        });
    });

}

/**
 * This function queries the database
 * This is not exported into modules (private function)
 * @param sql the SQL query to execute
 * @param params the parameters array, default empty array
 * @param pipe the connection from the SQL pool to use
 * @returns SQL status object or data object on success, error on Exception
 */
const queryDatabase = async (sql: string, params: any[] = [], pipe: any): Promise<Error | object> => {

    return new Promise ((resolve, reject) => {
        pipe.query (sql, params, (error: Error, result: object) => {
            if (error)
                reject (error);
            else {
                pipe.release ();
                resolve (result);
            }
        });
    });

}

/**
 * Retrieves applicant data based on its id
 */
module.exports.retrieve = async (id: number): Promise<object>  => {

    return new Promise (async (resolve, reject) => {

        /** change this into an SQL procedure in the future */
        const sql = "SELECT * FROM application_data WHERE applicant_no = ?;";
        try {

            const pipe = await getPoolTunnel ();
            const result = await queryDatabase (sql, [id], pipe);
            resolve (result);

        } catch (err: any) {
            reject (new Error(err.message));
        }   

    });

}

// module.exports.update = async (id: number, dataObj: object): Promise<true|Error> => {

//     return new Promise (async (resolve, reject) => {
 
//         const sql = "UPDATE application_data SET cp1 = ?, cp2 = ?, height =? weight = ?, bmi = ?, examiner_name = ?, examiner_contact = ?, examiner_license = ?, examiner_unit = ?, examination_date = ?, eligibility = ?, is_ip = ?, tribe_name = ?, highest_education = ?, course_strand = ?, school_name = ?, school_address = ?, is_valor_awardee = ?, relationship_to_awardee = ?,testing_center = ?;";

//     });

// }