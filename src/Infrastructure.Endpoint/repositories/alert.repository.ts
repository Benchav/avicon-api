import { IAlertRepository } from "../../Domain.Endpoint/interfaces/repositories/alertRepository.interface";
import AlertModel from "../../Domain.Endpoint/models/alert.model";
import { SqlReadOperation } from "../builders/sqlOperations.enum";
import { ISingletonSqlConnection } from "../database/dbConnection.interface";
import { ISqlCommandOperationBuilder } from "../interfaces/sqlCommandOperation.interface";
import { EntityType } from "../utils/entityTypes";

export class AlertRepository implements IAlertRepository {
  private readonly _operationBuilder: ISqlCommandOperationBuilder;
  private readonly _connection: ISingletonSqlConnection;

  constructor(
    operationBuilder: ISqlCommandOperationBuilder,
    connection: ISingletonSqlConnection
  ) {
    this._operationBuilder = operationBuilder;
    this._connection = connection;
  }

  async getAll(): Promise<AlertModel[]> {
    const readCommand = this._operationBuilder
      .Initialize(EntityType.Alert)
      .WithOperation(SqlReadOperation.Select)
      .BuildReader();
    const rows = await this._connection.executeQuery(readCommand);
    return rows.map(
      (row) =>
        new AlertModel(
          row["ID"],
          row["TITLE"],
          row["DESCRIPTION"],
          row["LEVEL"],
          row["IS_RESOLVED"],
          row["CREATED_AT"],
          row["LOTE_ID"]
        )
    );
  }
  async getById(id: string): Promise<AlertModel | null> {
    const readCommand = this._operationBuilder
      .Initialize(EntityType.Chicken)
      .WithOperation(SqlReadOperation.SelectById)
      .WithId(id)
      .BuildReader();
    const row = await this._connection.executeScalar(readCommand);
    if (!row) return null;
    return new AlertModel(
      row["ID"],
      row["TITLE"],
      row["DESCRIPTION"],
      row["LEVEL"],
      row["IS_RESOLVED"],
      row["CREATED_AT"],
      row["LOTE_ID"]
    );
  }
  
  create(alert: AlertModel): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(alert: AlertModel): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(alert: AlertModel): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
