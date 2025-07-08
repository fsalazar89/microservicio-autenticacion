const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_APP_HOST,
  port: process.env.DB_APP_PORT,
  database: process.env.DB_APP_DB,
  user: process.env.DB_APP_USR,
  password: process.env.DB_APP_PWD
});

pool.on("connect", () => {
  console.log("Conexión exitosa a la base de datos PostgreSQL");
});

module.exports = pool;
