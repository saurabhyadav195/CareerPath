const mysql = require('mysql2');

// Create MySQL connection
// Set these environment variables or update the defaults below
const db = mysql.createConnection({
  host:     process.env.DB_HOST     || 'localhost',
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '123456',        
  database: process.env.DB_NAME     || 'careerpath_db'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err.message);
    return;
  }
  console.log('Connected to MySQL database: careerpath_db');
});

module.exports = db;
