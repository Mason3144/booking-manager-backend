require("dotenv").config();

const mysql = require('mysql2/promise');

const conn = mysql.createPool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port:process.env.DB_PORT
})

// const { Pool } = require("pg");

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_DATABASE,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });

module.exports = {
  test: async () => {
    const [time] = await conn.query(`select now()`)
    return time[0]
  },
  changePassword: async (password:string,email:string) => {
    await conn.query(`UPDATE owner SET password = '${password}' WHERE email = '${email}'`)
  },
  findSingleUser: async (value: string, type: string) => {
    const [rows] = await conn.query(`SELECT * FROM owner WHERE ${type} = '${value}'`)
    return rows[0]
  },
  createOwner: async (username: string, password: string, email: string) => {
    await conn.query(`INSERT INTO owner (username, password, email) VALUES ('${username}', '${password}', '${email}')`)
    const [rows] = await conn.query(`SELECT * FROM owner WHERE username = '${username}'`)
    return rows[0]
  }
};
