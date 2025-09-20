import { EntityType } from './../utils/entityTypes';
import { SqlEntitySettings, SqlColumnSettings } from "../builders/sqlEntitySettings";
import { IEntitiesService } from "../interfaces/entitiesService.interface";
import { injectable } from "tsyringe";

@injectable()
export class EntitiesService implements IEntitiesService {
  private entities = new Map<EntityType, SqlEntitySettings>();

  constructor() {
    this.buildEntities();
  }

  GetSettings(type: EntityType): SqlEntitySettings {
     const settings = this.entities.get(type);
    if (!settings) {
      throw new Error(`Entidad no encontrada: ${type}`);
    }
    return settings;
  }

  private buildEntities(): void {
    const chickenSettings = this.getChickenSettings();
    const alertSettings = this.getAlertSettings();
    this.entities.set(EntityType.Chicken, chickenSettings);
    this.entities.set(EntityType.Alert, alertSettings);

  }

  private getChickenSettings(): SqlEntitySettings {
    const columns: SqlColumnSettings[] = [
      new SqlColumnSettings("ID", "id", true),
      new SqlColumnSettings("LOTE_ID", "loteId", false),
      new SqlColumnSettings("RACE", "race", false),
      new SqlColumnSettings("BIRTHDATE", "birthdate", false),
      new SqlColumnSettings("CURRENT_WEIGHT", "currentWeight", false),
      new SqlColumnSettings("HEALTH_STATUS", "healthStatus", false),
      new SqlColumnSettings("DATE_READY_FOR_MEAT", "dateReadyForMeat", false),
      new SqlColumnSettings("DISEASE_HISTORY", "diseaseHistory", false),
      new SqlColumnSettings("NAME", "name", false),
    ];

    //aca definimos el nombre de la tabla en nuestro caso chickens
    return new SqlEntitySettings("CHICKENS", columns); 
  }

  private getAlertSettings(): SqlEntitySettings {
    const columns: SqlColumnSettings[] = [
      new SqlColumnSettings("ID", "id", true),
      new SqlColumnSettings("TITLE", "title", false),
      new SqlColumnSettings("DESCRIPTION", "message", false),
      new SqlColumnSettings("LEVEL", "level", false),
      new SqlColumnSettings("IS_RESOLVED", "isResolved", false),
      new SqlColumnSettings("CREATED_AT", "createdAt", false),
      new SqlColumnSettings("LOTE_ID", "loteId", false),
    ];

    return new SqlEntitySettings("ALERTS", columns);
  }
  
}
