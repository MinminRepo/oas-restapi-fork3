/** import required modules */
require('dotenv').config();
const mysql = require ('mysql');

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
        throw new Error (`Cannot connect to database, invalid connection type is set.\nValues must either be 'TCP' or 'UNIX SOCKET' but '${process.env.CONNECT_TYPE}' is given.`);
    }
}

const connectionPool = mysql.createPool (mysqlOptions);


/** function definitions for module export ======================================== */

/**
 * This function will get a new empty connection from the pool
 * of connections
 * @returns pipe object on resolve, error on reject
 */
module.exports.getPoolTunnel = async (): Promise<Error | object> => {

    return new Promise ((resolve, reject) => {
        connectionPool.getConnection ((error: Error, pipe: any) => {
            if (error)
                reject (error);
            else 
                resolve (pipe);
        });
    });

}


module.exports.queryDatabase = async (sql: string, params: any[], pipe: any): Promise<Error | object> => {

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