import BaseModel from "../../Domain.Endpoint/models/base.model";
import { SqlEntitySettings } from "../builders/sqlEntitySettings";

export interface IEntitiesService{
   GetSettings<TEntity extends BaseModel>(): SqlEntitySettings;
}