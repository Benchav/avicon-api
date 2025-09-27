import { Health } from '../../Domain.Endpoint/models/health.enum';
import { chickenData } from '../data/pollos.data';
import { alertsData } from '../data/alerts.data';
import { lotesData } from '../data/lotes.data';
import { reportesData } from '../data/reportes.data';
import { saludData } from '../data/salud.data';
import { createClient } from '@libsql/client';

const dbUrl = process.env.DATABASE_URL || 'libsql://farmdb-escanor.aws-eu-west-1.turso.io';
const token = process.env.DATABASE_AUTH_TOKEN || "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NTkwMDgyNzIsImlkIjoiYzY4Mjc0YTctYjNjYi00OWVkLWFmODctYzhmMjhhYjIzYzc4IiwicmlkIjoiOWI4YjE5MTktMGM4Yi00YjkzLTgzYzMtZWM2MmFjZTA1ZDJlIn0.nQH-7NfpF58A-PFYd3j_8EAzHAQof2YwptCCa0MUD5hzX1X5OpcWCqsUj1yVfr_GcocgKRrt0FegTTtTnGRxAg";
export async function initializeDatabase(): Promise<void> {
  const db = createClient({ url: dbUrl, authToken: token });

  try {
    // CHICKENS
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

    for (const chicken of chickenData) {
      await db.execute(
        `INSERT OR IGNORE INTO CHICKENS
          (ID, LOTE_ID, NAME, RACE, BIRTHDATE, CURRENT_WEIGHT, HEALTH_STATUS, DATE_READY_FOR_MEAT, DISEASE_HISTORY)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          chicken.id,
          chicken.loteId ?? null,
          chicken.name ?? null,
          chicken.race ?? null,
          chicken.birthdate ?? null,
          chicken.currentWeight ?? null,
          chicken.healthStatus === Health.HEALTHY ? 1 : 0,
          (chicken.dateReadyForMeat as Date)?.toISOString() ?? null,
          chicken.diseaseHistory ?? null,
        ]
      );
    }

    // ALERTS
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

    for (const alert of alertsData) {
      await db.execute(
        `INSERT OR IGNORE INTO ALERTS
          (ID, TITLE, DESCRIPTION, LEVEL, IS_RESOLVED, CREATED_AT, LOTE_ID)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          alert.id,
          alert.title ?? null,
          alert.message ?? null,
          alert.level ?? null,
          alert.isResolved ? 1 : 0,
          (alert.createdAt as Date)?.toISOString() ?? null,
          alert.loteId ?? null,
        ]
      );
    }

    // LOTES
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

    for (const lote of lotesData) {
      await db.execute(
        `INSERT OR IGNORE INTO LOTES
          (ID, CODE, NAME, LOCATION, CAPACITY, CREATED_AT, STATUS, DESCRIPTION)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          lote.id,
          lote.code ?? null,
          lote.name ?? null,
          lote.location ?? null,
          lote.capacity ?? null,
          (lote.createdAt as Date)?.toISOString() ?? null,
          lote.status ?? null,
          lote.description ?? null,
        ]
      );
    }

    // REPORTS
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

    for (const report of reportesData) {
      await db.execute(
        `INSERT OR IGNORE INTO REPORTS
          (ID, TITLE, DESCRIPTION, TYPE, STATUS, LOTE_ID, CREATED_BY, CREATED_AT, RESOLVED_AT)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          report.id,
          report.title ?? null,
          report.description ?? null,
          report.type ?? null,
          report.status ?? null,
          report.loteId ?? null,
          report.createdBy ?? null,
          (report.createdAt as Date)?.toISOString() ?? null,
          report.resolvedAt ? (report.resolvedAt as Date).toISOString() : null,
        ]
      );
    }

    // HEALTH_RECORDS
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

    for (const salud of saludData) {
      await db.execute(
        `INSERT OR IGNORE INTO HEALTH_RECORDS
          (ID, LOTE_ID, DISEASE, TREATMENT, OBSERVATIONS, STATUS, CREATED_AT)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          salud.id,
          salud.loteId ?? null,
          salud.disease ?? null,
          salud.treatment ?? null,
          salud.observations ?? null,
          salud.status ?? null,
          (salud.createdAt as Date)?.toISOString() ?? null,
        ]
      );
    }

    console.log('Base de datos inicializada correctamente en Turso.');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  } finally {
    await db.close();
  }
}

initializeDatabase();
