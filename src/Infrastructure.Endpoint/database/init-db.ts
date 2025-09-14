import { chickenData } from './../data/pollos.data';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
// Asegúrate de que las rutas sean correctas, navegando desde la ubicación del script

import { Health } from '../../../src/Domain.Endpoint/models/health.enum';

// Ruta de la base de datos
const dbFilePath = './farm.db';

async function initializeDatabase(): Promise<void> {
  // Abre la conexión a la base de datos
  const db = await open({
    filename: dbFilePath,
    driver: sqlite3.Database,
  });

  try {
    console.log('Creando tabla "chickens"...');
    await db.exec(`
      CREATE TABLE IF NOT EXISTS chickens (
        id TEXT PRIMARY KEY,
        loteId TEXT,
        name TEXT,
        race TEXT,
        birthdate TEXT,
        currentWeight TEXT,
        healthStatus INTEGER,
        dateReadyForMeat TEXT,
        diseaseHistory TEXT
      );
    `);
    console.log('Tabla "chickens" creada.');

    console.log('Insertando datos de pollos...');
    const insertStmt = await db.prepare(`
      INSERT OR IGNORE INTO chickens (
        id, loteId, name, race, birthdate, currentWeight,
        healthStatus, dateReadyForMeat, diseaseHistory
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const chicken of chickenData) {
      await insertStmt.run(
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

    await insertStmt.finalize();
    console.log('Datos de pollos insertados con éxito.');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  } finally {
    // Cierra la conexión
    await db.close();
    console.log('Conexión a la base de datos cerrada.');
  }
}

initializeDatabase();