import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { ISingletonSqlConnection } from "./dbConnection.interface";
import { SqlCommand } from "../interfaces/sqlCommand.interface";
import { injectable } from "tsyringe";
import path from "path";

@injectable()
export class SingletonSqlConnection implements ISingletonSqlConnection {
  private static instance: SingletonSqlConnection;
  private db!: Database;

  public constructor(){};

  public static getInstance(): SingletonSqlConnection {
    if (!SingletonSqlConnection.instance) {
      SingletonSqlConnection.instance = new SingletonSqlConnection();
    }
    return SingletonSqlConnection.instance;
  }

  async openConnection(file: string = path.resolve(__dirname, "../database/farm.db")): Promise<void> {
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
    if (!this.db) await this.openConnection();
    const params = this.mapParameters(command.parameters);
    await this.db.run(command.query, params);
  }

  async executeQuery(command: SqlCommand): Promise<any[]> {
    if (!this.db) await this.openConnection();
    const params = this.mapParameters(command.parameters);
    return await this.db.all(command.query, params);
  }

  async executeScalar(command: SqlCommand): Promise<any> {
    if (!this.db) await this.openConnection();
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
