// config/database.js
import pkg from "pg";
import dotenv from "dotenv";
const { Pool } = pkg;

dotenv.config({ path: "../config.env" });
// console.log("DB_USER:", process.env.DB_USER);
// console.log("DB_PASSWORD:", process.env.DB_PASSWORD); // Check if this is undefined

const pool = new Pool({
  user: "postgres",
  host: process.env.DB_HOST,
  database: "trade",
  password: "123456789",
  port: process.env.DB_PORT || 5432,
});

export default pool;
