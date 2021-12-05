const mysql = require('mysql');

const config = require('../config');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

// Connect to database
let connection;

function handleConn() {
    connection = mysql.createConnection(dbconfig);
    connection.connect((err) => {
        if (err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleConn, 2000);
        } else {
            console.log('Connected to db!');
        }
    });

    connection.on('error', (err) => {
        if (err) {
            console.log('error when connecting to db:', err);
        }
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleConn();
        } else {
            throw err;
        }
    });
}

handleConn();

function list(table) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

module.exports = {
    list,
};