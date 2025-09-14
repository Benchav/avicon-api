import { SqlCommandOperationBuilder } from "./sqlCommandOperation.builder";
import { IEntitiesService } from "./../interfaces/entitiesService.interface";
import BaseModel from "../../Domain.Endpoint/models/base.model";
import {
  IExecuteReadBuilder,
  IExecuteWriteBuilder,
  IHavePrimaryKeyValue,
  IHaveSqlReadOperation,
  IHaveSqlWriteOperation,
  ISqlCommandOperationBuilder,
} from "../interfaces/sqlCommandOperation.interface";
import { SqlReadOperation, SqlWriteOperation } from "./sqlOperations.enum";
import { SqlColumnSettings } from "./sqlEntitySettings";
import { SqlCommand } from "../interfaces/sqlCommand.interface";

export class SqlCommandOperationBuilder implements ISqlCommandOperationBuilder {
  private readonly _entitiesService: IEntitiesService;

  constructor(entitiesService: IEntitiesService) {
    this._entitiesService = entitiesService;
  }

  From<TEntity extends BaseModel>(entity: TEntity): IHaveSqlWriteOperation {
    return new SqlCommandWriteBuilder<TEntity>(this._entitiesService, entity);
  }

  Initialize<TEntity extends BaseModel>(): IHaveSqlReadOperation {
    return new SqlCommandOperationBuilderGeneric<TEntity>(
      this._entitiesService
    );
  }
}

export class SqlCommandWriteBuilder<TEntity extends BaseModel>
  implements IHaveSqlWriteOperation, IExecuteWriteBuilder
{
  private operation!: SqlWriteOperation;
  private readonly entity: TEntity;
  private readonly entitiesService: IEntitiesService;

  constructor(entitiesService: IEntitiesService, entity: TEntity) {
    this.entity = entity;
    this.entitiesService = entitiesService;
  }

  WithOperation(operation: SqlWriteOperation): IExecuteWriteBuilder {
    this.operation = operation;
    return this;
  }

  BuildWritter(): SqlCommand {
    switch (this.operation) {
      case SqlWriteOperation.Create:
        return this.getInsertCommand();
      case SqlWriteOperation.Update:
        return this.getUpdateCommand();
      case SqlWriteOperation.Delete:
        return this.getDeleteCommand();
      default:
        throw new Error("Invalid write operation.");
    }
  }

  private getInsertCommand():SqlCommand {
    const entitySettings = this.entitiesService.GetSettings<TEntity>();
    const sqlQuery=  this.getInsertQuery(entitySettings.tableName, entitySettings.columns)
    const parameters = this.getSqlParameters(entitySettings.columns)
    return { query: sqlQuery, parameters };
  }

  private getInsertQuery(
    entityName: string,
    columns: SqlColumnSettings[]
  ): string {
    const columnNames = columns.map((c) => c.name);
    const parameterNames = columns.map((c) => c.parameterName);
    return `INSERT INTO ${entityName} (${columnNames.join(
      ", "
    )}) VALUES (${parameterNames.join(", ")});`;
  }

  //funcion para obtener los parametros y el valor a insertar con los parametros
  //ej: @name es el parameter "oscar" seria el value 
  private getSqlParameters(
    columns: SqlColumnSettings[]
  ): { name: string; value: any }[] {
    return columns.map((c) => ({
      name: c.parameterName,
      value: (this.entity as any)[c.domainName] ?? null,
    }));
  }

  private getUpdateCommand(): SqlCommand {
    const entitySettings = this.entitiesService.GetSettings<TEntity>();
    const sqlQuery = this.getUpdateQuery(entitySettings.tableName, entitySettings.columns);
    const parameters = this.getSqlParameters(entitySettings.columns);
    return { query: sqlQuery, parameters };
  }

  private getUpdateQuery(entityName: string, columns: SqlColumnSettings[]): string {
    const primaryKey = columns.find(c => c.isPrimaryKey);
    if (!primaryKey) throw new Error("No primary key found for update.");

    const setClauses = columns
      .filter(c => !c.isPrimaryKey)
      .map(c => `${c.name} = ${c.parameterName}`);

    return `UPDATE ${entityName} SET ${setClauses.join(", ")} WHERE ${primaryKey.name} = ${primaryKey.parameterName};`;
  }

  private getDeleteCommand(): SqlCommand {
    const entitySettings = this.entitiesService.GetSettings<TEntity>();
    const sqlQuery = this.getDeleteQuery(entitySettings.tableName, entitySettings.columns);
    const parameters = this.getSqlParameters(entitySettings.columns);
    return { query: sqlQuery, parameters };
  }

  private getDeleteQuery(entityName: string, columns: SqlColumnSettings[]): string {
    const primaryKey = columns.find(c => c.isPrimaryKey);
    if (!primaryKey) throw new Error("No primary key found for delete.");
    return `DELETE FROM ${entityName} WHERE ${primaryKey.name} = ${primaryKey.parameterName};`;
  }
}
