require("dotenv").config();
import { createTableFn } from "./createTables";

const { Pool } = require("pg");

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = {

  findSingleUser: async (value: string, type: string) => {
    const {rows} = await pool.query(`SELECT ${type} FROM owner WHERE ${type} = $1`, [value])
    return rows[0]
  },
  createOwner: async (username:string, password:string, email:string) => {
    await pool.query(`INSERT INTO owner (username, password, email) VALUES ($1, $2, $3)`, [username, password, email])
    const {rows} = await pool.query(`SELECT * FROM owner WHERE username = $1`, [username])
    return rows[0]
  }

};
