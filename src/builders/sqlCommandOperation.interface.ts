import BaseModel from "../models/base.model";
import { SqlReadOperation, SqlWriteOperation } from "./sqlOperations.enum";

export interface ISqlCommandOperationBuilder {
  From<TEntity extends BaseModel>(entity: TEntity): IHaveSqlWriteOperation;
  Initialize<TEntity extends BaseModel>(): IHaveSqlReadOperation;
}

export interface IHaveSqlWriteOperation {
  WithOperation(operation: SqlWriteOperation): IExecuteWriteBuilder;
}

export interface IExecuteWriteBuilder {
  BuildWritter(): string; 
}

export interface IHaveSqlReadOperation {
  WithOperation(operation: SqlReadOperation): IHavePrimaryKeyValue;
}

export interface IHavePrimaryKeyValue extends IExecuteReadBuilder {
  WithId(id: string): IExecuteReadBuilder;
}

export interface IExecuteReadBuilder {
  BuildReader(): string; 
}