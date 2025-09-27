//import sqlite3 from "sqlite3";
//import { open, Database } from "sqlite";
import { ISingletonSqlConnection } from "./dbConnection.interface";
import { createClient } from "@libsql/client";
import { SqlCommand } from "../interfaces/sqlCommand.interface";
import { injectable } from "tsyringe";
//import path from "path";

@injectable()
export class SingletonSqlConnection implements ISingletonSqlConnection {
  private static instance: SingletonSqlConnection;
  //private db!: Database; //este es para sqlite local
  private db!: ReturnType<typeof createClient>;

  public constructor() {}

  public static getInstance(): SingletonSqlConnection {
    if (!SingletonSqlConnection.instance) {
      SingletonSqlConnection.instance = new SingletonSqlConnection();
    }
    return SingletonSqlConnection.instance;
  }

  async openConnection(): //file: string = path.join(__dirname, "..", "..", "..", "farm.db")
  Promise<void> {
    if (!this.db) {
      // this.db = await open({
      //   filename: file,
      //   driver: sqlite3.Database,
      // });
      // console.log("Conexión SQLite abierta");
      this.db = createClient({
        url:
          process.env.DATABASE_URL ||
          "libsql://farmdb-escanor.aws-eu-west-1.turso.io",
        authToken:
          process.env.DATABASE_AUTH_TOKEN ||
          "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NTkwMDgyNzIsImlkIjoiYzY4Mjc0YTctYjNjYi00OWVkLWFmODctYzhmMjhhYjIzYzc4IiwicmlkIjoiOWI4YjE5MTktMGM4Yi00YjkzLTgzYzMtZWM2MmFjZTA1ZDJlIn0.nQH-7NfpF58A-PFYd3j_8EAzHAQof2YwptCCa0MUD5hzX1X5OpcWCqsUj1yVfr_GcocgKRrt0FegTTtTnGRxAg",
      });
      console.log("Conexión Turso abierta");
    }
  }

  async closeConnection(): Promise<void> {
    // if (this.db) {
    //   await this.db.close();
    //   this.db = undefined as any;
    //   console.log("Conexión SQLite cerrada");
    // }
    if (this.db) {
      // No hay un método close en Turso client, puedes dejarlo en null si quieres "desconectar"
      this.db = null as any;
      console.log("Conexión Turso cerrada");
    }
  }

  async executeNonQuery(command: SqlCommand): Promise<void> {
    try {
      await this.openConnection();
      const params = this.mapParameters(command.parameters);
      //await this.db.run(command.query, params); //para sqlite local usa run
      await this.db.execute(command.query, params);
    } finally {
      await this.closeConnection();
    }
  }

  async executeQuery(command: SqlCommand): Promise<any[]> {
    try {
      await this.openConnection();
      const params = this.mapParameters(command.parameters);
      //return await this.db.all(command.query, params);
      const result = await this.db.execute(command.query, params);
      return result.rows;
    } finally {
      await this.closeConnection();
    }
  }

  //para sqlite local
  // async executeScalar(command: SqlCommand): Promise<any> {
  //   try {
  //     await this.openConnection();
  //     const params = this.mapParameters(command.parameters);
  //     //return await this.db.get(command.query, params);
  //     return await this.db.execute(command.query, params);
  //   } finally {
  //     await this.closeConnection();
  //   }
  // }

  //para sqlite local
  // private mapParameters(parameters: { name: string; value: any }[]) {
  //   const mapped: any = {};
  //   for (const p of parameters) {
  //     mapped[p.name] = p.value;
  //   }
  //   return mapped;
  // }
  async executeScalar(command: SqlCommand): Promise<any | null> {
    try {
      await this.openConnection();
      const params = this.mapParameters(command.parameters);
      const result = await this.db.execute(command.query, params);
      return result.rows.length > 0 ? result.rows[0] : null;
    } finally {
      await this.closeConnection();
    }
  }

  private mapParameters(parameters: { name: string; value: any }[]) {
    const mapped: Record<string, string | number | boolean | null> = {};
    for (const p of parameters) {
      let val = p.value;
      if (val === undefined || val === null) val = null;
      else if (val instanceof Date) val = val.toISOString();
      else if (typeof val === "boolean")
        val = val ? 1 : 0; // Turso no admite true/false directamente
      else if (typeof val === "object")
        val = JSON.stringify(val); // opcional, para objetos
      else val = val.toString(); // aseguramos string para ids
      mapped[p.name] = val;
    }
    return mapped;
  }
}
