import { createPool } from "mysql2/promise";
import dotenv from "dotenv";

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

  async insertLog(symbol: string, currentPrice: number) {
    /**
     * I will change the query to insert the logs with the user_id
     */
    const query = "INSERT INTO logs (symbol, current_price) VALUES (?, ?)";
    const values = [symbol, currentPrice];
    await this.pool.query(query, values);
  }

  async getLogs(limit: number) {
    /**
     * I will change the query to get the logs from the user_id
     */
    const query = "SELECT * FROM logs ORDER BY created_at DESC LIMIT ?";
    const [rows] = await this.pool.query(query, [limit]);
    return rows;
  }
}

const dbConnection = new Database(pool);
export default dbConnection;
