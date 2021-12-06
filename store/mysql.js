const mysql = require("mysql");

const config = require("../config");

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
      console.log("error when connecting to db:", err);
      setTimeout(handleConn, 2000);
    } else {
      console.log("Connected to db!");
    }
  });

  connection.on("error", (err) => {
    if (err) {
      console.log("error when connecting to db:", err);
    }
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
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

function get(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function insert(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function update(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${table} SET ? WHERE id=?`,
      [data, data.id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

function upsert(table, data) {
  if (data && data.id) {
    return update(table, data);
  } else {
    return insert(table, data);
  }
}

function query(table, query) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE ?`, query, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data[0] || null);
      }
    });
  });
}

module.exports = {
  list,
  get,
  upsert,
  query,
};
