import { createPool } from "mysql2/promise";
import dotenv from "dotenv";
import { hashPassword } from "../utils/manage-passwords";

dotenv.config();

const pool = createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

class Database {
  private pool: any;

  constructor(pool: any) {
    this.pool = pool;
  }

  async insertLog(symbol: string, currentPrice: number, user_id: number) {
    const query =
      "INSERT INTO logs (symbol, current_price, user_id) VALUES (?, ?, ?)";
    const values = [symbol, currentPrice, user_id];
    await this.pool.query(query, values);
  }

  async getLogs(limit: number, user_id: number) {
    const query =
      "SELECT * FROM logs WHERE user_id = ? ORDER BY created_at DESC LIMIT ?";
    const [rows] = await this.pool.query(query, [user_id, limit]);
    return rows;
  }

  async getUserByEmail(email: string) {
    const query = "SELECT * FROM users WHERE email = ?";
    const [rows] = await this.pool.query(query, [email]);
    return rows;
  }

  async createUser(name: string, email: string, password: string) {
    const hashedPassword = await hashPassword(password);
    console.log("Hashed Password:", hashedPassword);
    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    await this.pool.query(query, [name, email, hashedPassword]);
  }
}

const dbConnection = new Database(pool);
export default dbConnection;
