import { Health } from '../../Domain.Endpoint/models/health.enum';
import { chickenData } from '../data/pollos.data';
import { alertsData } from '../data/alerts.data';
import { lotesData } from '../data/lotes.data';
import { reportesData } from '../data/reportes.data';
import { saludData } from '../data/salud.data';
import { createClient } from '@libsql/client';

// URL de Turso
const dbUrl = process.env.DATABASE_URL || 'libsql://farmdb-escanor.aws-eu-west-1.turso.io';

// Función helper para simular prepare/run/finalize
function prepare(db: ReturnType<typeof createClient>, sql: string) {
  return {
    run: async (params: any[]) => db.execute(sql, params),
    finalize: async () => {}, // no hace nada, solo para mantener tu estilo
  };
}

export async function initializeDatabase(): Promise<void> {
  const db = createClient({ url: dbUrl });

  try {
    //
    // TABLA CHICKENS
    //
    await db.execute(`
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

    const insertChickenStmt = prepare(db, `
      INSERT OR IGNORE INTO CHICKENS (
        ID, LOTE_ID, NAME, RACE, BIRTHDATE, CURRENT_WEIGHT, HEALTH_STATUS, DATE_READY_FOR_MEAT, DISEASE_HISTORY
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const chicken of chickenData) {
      await insertChickenStmt.run([
        chicken.id,
        chicken.loteId,
        chicken.name,
        chicken.race,
        chicken.birthdate,
        chicken.currentWeight,
        chicken.healthStatus === Health.HEALTHY ? 1 : 0,
        (chicken.dateReadyForMeat as Date).toISOString(),
        chicken.diseaseHistory,
      ]);
    }
    await insertChickenStmt.finalize();

    //
    // TABLA ALERTS
    //
    await db.execute(`
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

    const insertAlertStmt = prepare(db, `
      INSERT OR IGNORE INTO ALERTS (
        ID, TITLE, DESCRIPTION, LEVEL, IS_RESOLVED, CREATED_AT, LOTE_ID
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    for (const alert of alertsData) {
      await insertAlertStmt.run([
        alert.id,
        alert.title,
        alert.message,
        alert.level,
        alert.isResolved ? 1 : 0,
        (alert.createdAt as Date).toISOString(),
        alert.loteId,
      ]);
    }
    await insertAlertStmt.finalize();

    //
    // TABLA LOTES
    //
    await db.execute(`
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

    const insertLoteStmt = prepare(db, `
      INSERT OR IGNORE INTO LOTES (
        ID, CODE, NAME, LOCATION, CAPACITY, CREATED_AT, STATUS, DESCRIPTION
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const lote of lotesData) {
      await insertLoteStmt.run([
        lote.id,
        lote.code,
        lote.name,
        lote.location,
        lote.capacity,
        (lote.createdAt as Date).toISOString(),
        lote.status,
        lote.description,
      ]);
    }
    await insertLoteStmt.finalize();

    //
    // TABLA REPORTS
    //
    await db.execute(`
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

    const insertReportStmt = prepare(db, `
      INSERT OR IGNORE INTO REPORTS (
        ID, TITLE, DESCRIPTION, TYPE, STATUS, LOTE_ID, CREATED_BY, CREATED_AT, RESOLVED_AT
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const report of reportesData) {
      await insertReportStmt.run([
        report.id,
        report.title,
        report.description,
        report.type,
        report.status,
        report.loteId,
        report.createdBy,
        (report.createdAt as Date).toISOString(),
        report.resolvedAt ? (report.resolvedAt as Date).toISOString() : null,
      ]);
    }
    await insertReportStmt.finalize();

    //
    // TABLA HEALTH_RECORDS
    //
    await db.execute(`
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

    const insertSaludStmt = prepare(db, `
      INSERT OR IGNORE INTO HEALTH_RECORDS (
        ID, LOTE_ID, DISEASE, TREATMENT, OBSERVATIONS, STATUS, CREATED_AT
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    for (const salud of saludData) {
      await insertSaludStmt.run([
        salud.id,
        salud.loteId,
        salud.disease,
        salud.treatment,
        salud.observations,
        salud.status,
        (salud.createdAt as Date).toISOString(),
      ]);
    }
    await insertSaludStmt.finalize();

  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  } finally {
    await db.close();
    console.log('\nConexión a la base de datos cerrada.');
  }
}

initializeDatabase();
