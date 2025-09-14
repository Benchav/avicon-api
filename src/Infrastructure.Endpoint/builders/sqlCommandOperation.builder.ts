import { IEntitiesService } from "./../interfaces/entitiesService.interface";
import BaseModel from "../../Domain.Endpoint/models/base.model";
import {
  IHaveSqlReadOperation,
  IHaveSqlWriteOperation,
  ISqlCommandOperationBuilder,
} from "../interfaces/sqlCommandOperation.interface";

export class SqlCommandOperationBuilder implements ISqlCommandOperationBuilder {
  private readonly _entitiesService: IEntitiesService;
  
  constructor(entitiesService: IEntitiesService) {
    this._entitiesService = entitiesService;
  }

  From<TEntity extends BaseModel>(entity: TEntity): IHaveSqlWriteOperation {
    throw new Error("Method not implemented.");
  }

  Initialize<TEntity extends BaseModel>(): IHaveSqlReadOperation {
    throw new Error("Method not implemented.");
  }
}
