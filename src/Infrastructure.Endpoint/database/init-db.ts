import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { Health } from '../../Domain.Endpoint/models/health.enum';
import { chickenData } from '../data/pollos.data';
import { alertsData } from '../data/alerts.data';
import { lotesData } from '../data/lotes.data';
import { reportesData } from '../data/reportes.data';
import { saludData } from '../data/salud.data';


// Ruta de la base de datos
const dbFilePath = './farm.db';

export async function initializeDatabase(): Promise<void> {
  const db = await open({
    filename: dbFilePath,
    driver: sqlite3.Database,
  });

  try {
    //
    // Lógica para la tabla de pollos (CHICKENS)
    //
    console.log('Creando tabla "CHICKENS"...');
    await db.exec(`
      CREATE TABLE IF NOT EXISTS CHICKENS (
        ID TEXT PRIMARY KEY,
        LOTE_ID TEXT,
        NAME TEXT,
        RACE TEXT,
        BIRTHDATE TEXT,
        CURRENT_WEIGHT TEXT,
        HEALTH_STATUS INTEGER,
        DATE_READY_FOR_MEAT TEXT,
        DISEASE_HISTORY TEXT
      );
    `);
    console.log('Tabla "CHICKENS" creada.');

    console.log('Insertando datos de pollos...');
    const insertChickenStmt = await db.prepare(`
      INSERT OR IGNORE INTO CHICKENS (
        ID, LOTE_ID, NAME, RACE, BIRTHDATE, CURRENT_WEIGHT, HEALTH_STATUS, DATE_READY_FOR_MEAT, DISEASE_HISTORY
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const chicken of chickenData) {
      await insertChickenStmt.run(
        chicken.id,
        chicken.loteId,
        chicken.name,
        chicken.race,
        chicken.birthdate,
        chicken.currentWeight,
        chicken.healthStatus === Health.HEALTHY ? 1 : 0,
        (chicken.dateReadyForMeat as Date).toISOString(),
        chicken.diseaseHistory
      );
    }
    await insertChickenStmt.finalize();
    console.log('Datos de pollos insertados con éxito.');

    //
    // Lógica para la tabla de alertas (ALERTS)
    //
    console.log('\nCreando tabla "ALERTS"...');
    await db.exec(`
      CREATE TABLE IF NOT EXISTS ALERTS (
        ID TEXT PRIMARY KEY,
        TITLE TEXT NOT NULL,
        DESCRIPTION TEXT,
        LEVEL TEXT NOT NULL,
        IS_RESOLVED INTEGER NOT NULL,
        CREATED_AT TEXT NOT NULL,
        LOTE_ID TEXT
      );
    `);
    console.log('Tabla "ALERTS" creada.');

    console.log('Insertando datos de alertas...');
    const insertAlertStmt = await db.prepare(`
      INSERT OR IGNORE INTO ALERTS (
        ID, TITLE, DESCRIPTION, LEVEL, IS_RESOLVED, CREATED_AT, LOTE_ID
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    for (const alert of alertsData) {
      await insertAlertStmt.run(
        alert.id,
        alert.title,
        alert.message,
        alert.level,
        alert.isResolved ? 1 : 0,
        (alert.createdAt as Date).toISOString(),
        alert.loteId
      );
    }
    await insertAlertStmt.finalize();
    console.log('Datos de alertas insertados con éxito.');
    
    //
    // Lógica para la tabla de lotes (LOTES)
    //
    console.log('\nCreando tabla "LOTES"...');
    await db.exec(`
      CREATE TABLE IF NOT EXISTS LOTES (
        ID TEXT PRIMARY KEY,
        CODE TEXT NOT NULL UNIQUE,
        NAME TEXT,
        LOCATION TEXT,
        CAPACITY INTEGER,
        CREATED_AT TEXT,
        STATUS TEXT,
        DESCRIPTION TEXT
      );
    `);
    console.log('Tabla "LOTES" creada.');

    console.log('Insertando datos de lotes...');
    const insertLoteStmt = await db.prepare(`
      INSERT OR IGNORE INTO LOTES (
        ID, CODE, NAME, LOCATION, CAPACITY, CREATED_AT, STATUS, DESCRIPTION
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const lote of lotesData) {
      await insertLoteStmt.run(
        lote.id,
        lote.code,
        lote.name,
        lote.location,
        lote.capacity,
        (lote.createdAt as Date).toISOString(),
        lote.status,
        lote.description
      );
    }
    await insertLoteStmt.finalize();
    console.log('Datos de lotes insertados con éxito.');

    //
    // Lógica para la tabla de reportes (REPORTS)
    //
    console.log('\nCreando tabla "REPORTS"...');
    await db.exec(`
      CREATE TABLE IF NOT EXISTS REPORTS (
        ID TEXT PRIMARY KEY,
        TITLE TEXT NOT NULL,
        DESCRIPTION TEXT,
        TYPE TEXT NOT NULL,
        STATUS TEXT NOT NULL,
        LOTE_ID TEXT,
        CREATED_BY TEXT,
        CREATED_AT TEXT NOT NULL,
        RESOLVED_AT TEXT
      );
    `);
    console.log('Tabla "REPORTS" creada.');

    console.log('Insertando datos de reportes...');
    const insertReportStmt = await db.prepare(`
      INSERT OR IGNORE INTO REPORTS (
        ID, TITLE, DESCRIPTION, TYPE, STATUS, LOTE_ID, CREATED_BY, CREATED_AT, RESOLVED_AT
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const report of reportesData) {
      await insertReportStmt.run(
        report.id,
        report.title,
        report.description,
        report.type,
        report.status,
        report.loteId,
        report.createdBy,
        (report.createdAt as Date).toISOString(),
        report.resolvedAt ? (report.resolvedAt as Date).toISOString() : null
      );
    }
    await insertReportStmt.finalize();
    console.log('Datos de reportes insertados con éxito.');

    //
    // Lógica para la tabla de salud (HEALTH_RECORDS)
    //
    console.log('\nCreando tabla "HEALTH_RECORDS"...');
    await db.exec(`
      CREATE TABLE IF NOT EXISTS HEALTH_RECORDS (
        ID TEXT PRIMARY KEY,
        LOTE_ID TEXT NOT NULL,
        DISEASE TEXT NOT NULL,
        TREATMENT TEXT NOT NULL,
        OBSERVATIONS TEXT,
        STATUS TEXT NOT NULL,
        CREATED_AT TEXT NOT NULL
      );
    `);
    console.log('Tabla "HEALTH_RECORDS" creada.');

    console.log('Insertando datos de salud...');
    const insertSaludStmt = await db.prepare(`
      INSERT OR IGNORE INTO HEALTH_RECORDS (
        ID, LOTE_ID, DISEASE, TREATMENT, OBSERVATIONS, STATUS, CREATED_AT
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    for (const salud of saludData) {
      await insertSaludStmt.run(
        salud.id,
        salud.loteId,
        salud.disease,
        salud.treatment,
        salud.observations,
        salud.status,
        (salud.createdAt as Date).toISOString()
      );
    }
    await insertSaludStmt.finalize();
    console.log('Datos de salud insertados con éxito.');

  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  } finally {
    await db.close();
    console.log('\nConexión a la base de datos cerrada.');
  }
}

initializeDatabase();
//npx ts-node init-db.ts