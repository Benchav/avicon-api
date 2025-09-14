import { saludData } from './../data/salud.data';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Ruta de la base de datos
const dbFilePath = './farm.db';

async function initializeDatabase(): Promise<void> {
  const db = await open({
    filename: dbFilePath,
    driver: sqlite3.Database,
  });

  try {
    //
    // Lógica para la tabla de salud (health_records)
    //
    console.log('\nCreando tabla "health_records"...');
    await db.exec(`
      CREATE TABLE IF NOT EXISTS health_records (
        id TEXT PRIMARY KEY,
        loteId TEXT NOT NULL,
        disease TEXT NOT NULL,
        treatment TEXT NOT NULL,
        observations TEXT,
        status TEXT NOT NULL,
        createdAt TEXT NOT NULL
      );
    `);
    console.log('Tabla "health_records" creada.');

    console.log('Insertando datos de salud...');
    const insertSaludStmt = await db.prepare(`
      INSERT OR IGNORE INTO health_records (
        id, loteId, disease, treatment, observations, status, createdAt
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