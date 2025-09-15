import { SqlEntitySettings, SqlColumnSettings } from "../builders/sqlEntitySettings";
import ChickenModel from "../../Domain.Endpoint/models/chicken.model";
import BaseModel from "../../Domain.Endpoint/models/base.model";
import { IEntitiesService } from "../interfaces/entitiesService.interface";

export class EntitiesService implements IEntitiesService {
  private entities = new Map<Function, SqlEntitySettings>();

  constructor() {
    this.buildEntities();
  }

  GetSettings<TEntity extends BaseModel>(type: new (...args: any[]) => TEntity): SqlEntitySettings {
    const settings = this.entities.get(type);
    if (!settings) {
      throw new Error(`Entidad no encontrada: ${type.name}`);
    }
    return settings;
  }

  private buildEntities(): void {
    const chickenSettings = this.getChickenSettings();
    this.entities.set(ChickenModel, chickenSettings);

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
    return new SqlEntitySettings("chickens", columns); 
  }
}
