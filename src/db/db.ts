import mysql from "mysql2/promise";

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "GearFifth-24",
  database: "blend_challenge",
});

class Database {
  private connection;

  constructor(connection: mysql.Pool) {
    this.connection = connection;
  }

  async insertLog(symbol: string, currentPrice: number) {
    const query = "INSERT INTO logs (symbol, current_price) VALUES (?, ?)";
    const values = [symbol, currentPrice];
    await this.connection.query(query, values);
  }

  async getLogs(limit: number) {
    const query = "SELECT * FROM logs ORDER BY id DESC LIMIT ?";
    const [rows] = await this.connection.query(query, [limit]);
    return rows;
  }
}

const dbConnection = new Database(connection);
export default dbConnection;
