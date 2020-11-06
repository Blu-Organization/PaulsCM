const mysql = require('mysql');

const connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'mvp',
});

connection.connect();

module.exports = connection;