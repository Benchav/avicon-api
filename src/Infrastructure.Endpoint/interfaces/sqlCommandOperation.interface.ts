import BaseModel from "../../Domain.Endpoint/models/base.model";
import { SqlReadOperation, SqlWriteOperation } from "../builders/sqlOperations.enum";
import { SqlCommand } from "./sqlCommand.interface";

export interface ISqlCommandOperationBuilder {
  From<TEntity extends BaseModel>(entity: TEntity): IHaveSqlWriteOperation;
  Initialize<TEntity extends BaseModel>(): IHaveSqlReadOperation;
}

export interface IHaveSqlWriteOperation {
  WithOperation(operation: SqlWriteOperation): IExecuteWriteBuilder;
}

export interface IExecuteWriteBuilder {
  BuildWritter(): SqlCommand; 
}

export interface IHaveSqlReadOperation {
  WithOperation(operation: SqlReadOperation): IHavePrimaryKeyValue;
}

export interface IHavePrimaryKeyValue extends IExecuteReadBuilder {
  WithId(id: string): IExecuteReadBuilder;
}

export interface IExecuteReadBuilder {
  BuildReader(): SqlCommand; 
}