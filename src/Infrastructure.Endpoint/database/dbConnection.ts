import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { ISingletonSqlConnection } from "./dbConnection.interface";
import { SqlCommand } from "../interfaces/sqlCommand.interface";

export class SingletonSqlConnection implements ISingletonSqlConnection {
  private static instance: SingletonSqlConnection;
  private db!: Database;

  private constructor(){};

  public static getInstance(): SingletonSqlConnection {
    if (!SingletonSqlConnection.instance) {
      SingletonSqlConnection.instance = new SingletonSqlConnection();
    }
    return SingletonSqlConnection.instance;
  }

  async openConnection(file: string = "./farm.db"): Promise<void> {
    if (!this.db) {
      this.db = await open({
        filename: file,
        driver: sqlite3.Database,
      });
      console.log("Conexión SQLite abierta");
    }
  }

  async closeConnection(): Promise<void> {
    if (this.db) {
      await this.db.close();
      this.db = undefined as any;
      console.log("Conexión SQLite cerrada");
    }
  }

  async executeNonQuery(command: SqlCommand): Promise<void> {
    const params = this.mapParameters(command.parameters);
    await this.db.run(command.query, params);
  }

  async executeQuery(command: SqlCommand): Promise<any[]> {
    const params = this.mapParameters(command.parameters);
    return await this.db.all(command.query, params);
  }

  async executeScalar(command: SqlCommand): Promise<any> {
    const params = this.mapParameters(command.parameters);
    return await this.db.get(command.query, params);
  }

  private mapParameters(parameters: { name: string; value: any }[]) {
    const mapped: any = {};
    for (const p of parameters) {
      mapped[p.name] = p.value;
    }
    return mapped;
  }
}
