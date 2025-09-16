import BaseModel from "../../Domain.Endpoint/models/base.model";
import { SqlEntitySettings } from "../builders/sqlEntitySettings";
import { EntityType } from "../utils/entityTypes";

export interface IEntitiesService{
   GetSettings(type: EntityType): SqlEntitySettings;
}