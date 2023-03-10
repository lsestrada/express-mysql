import mysql from 'mysql';

const DATABASE_HOST= "127.0.0.1";
const DATABASE_PORT = "3306";
const DATABASE_USER = "leoleo";
const DATABASE_PWD = "leoleo12345";
const DATABASE_NAME = "local_sample_db";

export let db = mysql.createConnection({
  host: DATABASE_HOST,
  port: +DATABASE_PORT,
  user: DATABASE_USER,
  password: DATABASE_PWD,
  database: DATABASE_NAME,
  insecureAuth: true,
  connectTimeout: 80000,
  charset : 'utf8mb4'
});

db.connect((err: any, param: any) => {
  if (err) {
    console.error("MySQL Connection Failed: " + err.stack);
  }
  console.log("MySQL: Thread ID: " + db.threadId);
  console.log("MySQL: Port: " + DATABASE_PORT);
  console.log("MySQL: Ready");
});

// module.exports = db;