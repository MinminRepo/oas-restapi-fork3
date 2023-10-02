"use strict";
require('dotenv').config();
const mysql = require('mysql');
let mysqlOptions = {
    connectionLimit: Number(process.env.CONNECTION_LIMIT),
    host: String(process.env.HOST),
    user: String(process.env.UNAME),
    password: String(process.env.PASSWORD),
    database: String(process.env.DATABASE),
    port: Number(process.env.PORT),
    socketPath: ""
};
switch (process.env.CONNECT_TYPE) {
    case "SOCKET": {
        mysqlOptions.socketPath = String(process.env.SOCKET_PATH);
        break;
    }
    case "TCP": {
        break;
    }
    default: {
        throw new Error(`Cannot connect to database, invalid connection type is set.\nValues must either be 'TCP' or 'UNIX SOCKET' but '${process.env.CONNECT_TYPE}' is given.`);
    }
}
const connectionPool = mysql.createPool(mysqlOptions);
module.exports.getPoolTunnel = async () => {
    return new Promise((resolve, reject) => {
        connectionPool.getConnection((error, pipe) => {
            if (error)
                reject(error);
            else
                resolve(pipe);
        });
    });
};
module.exports.queryDatabase = async (sql, params, pipe) => {
    return new Promise((resolve, reject) => {
        pipe.query(sql, params, (error, result) => {
            if (error)
                reject(error);
            else {
                pipe.release();
                resolve(result);
            }
        });
    });
};
