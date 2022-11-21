require("dotenv").config();
import session from "express-session";
const MySQLStore = require('express-mysql-session')(session);


const mysql = require('mysql2/promise');


const options = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port:process.env.DB_PORT
}
export const conn = mysql.createPool(options)
export const sessionStore = new MySQLStore(options, conn);




