// RETUNS MYSQL DATABASE

const mysql = require('mysql2'),
  { error } = require('handy-log'),
  { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env

// CREATES A DB CONNECTION
const db = mysql.createConnection({
  host: MYSQL_HOST,
  port: MYSQL_PORT || 3306,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  charset: 'utf8mb4',
})

// CONNECTS DB
db.connect(err => {
  if (err) {
    error(err.message)
  }
})

db.on('error', (err) => {
  if (err) {
    error(err.message)
  }
})

module.exports = db
