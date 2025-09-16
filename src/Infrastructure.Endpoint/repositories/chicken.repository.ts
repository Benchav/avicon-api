import { inject, injectable } from "tsyringe";
import { IChickenRepository } from "../../Domain.Endpoint/interfaces/repositories/chickenRepository.interface";
import ChickenModel from "../../Domain.Endpoint/models/chicken.model";
import { SqlReadOperation, SqlWriteOperation } from "../builders/sqlOperations.enum";
import { ISingletonSqlConnection } from "../database/dbConnection.interface";
import { ISqlCommandOperationBuilder } from "../interfaces/sqlCommandOperation.interface";
import { EntityType } from "../utils/entityTypes";

@injectable()
export class ChickenRepository implements IChickenRepository {
  private readonly _operationBuilder: ISqlCommandOperationBuilder;
  private readonly _connection: ISingletonSqlConnection;

  constructor(
    @inject('IOperationBuilder') operationBuilder: ISqlCommandOperationBuilder,
    @inject('ISingletonSqlConnection') connection: ISingletonSqlConnection
  ) {
    this._operationBuilder = operationBuilder;
    this._connection = connection;
  }

  async getAll(): Promise<ChickenModel[]> {
    const readCommand = this._operationBuilder
      .Initialize(EntityType.Chicken)
      .WithOperation(SqlReadOperation.Select)
      .BuildReader();
    
    const rows = await this._connection.executeQuery(readCommand);

    return rows.map(row => new ChickenModel(
      row["ID"], 
      row["LOTE_ID"],
      row["RACE"],
      row["BIRTHDATE"],
      row["CURRENT_WEIGHT"],
      row["HEALTH_STATUS"],
      row["DATE_READY_FOR_MEAT"],
      row["DISEASE_HISTORY"],
      row["NAME"]
    ));
    
  }
  async getById(id: string): Promise<ChickenModel | null> {
    const readCommand = this._operationBuilder
      .Initialize(EntityType.Chicken)
      .WithOperation(SqlReadOperation.SelectById)
      .WithId(id)
      .BuildReader();

    const row = await this._connection.executeScalar(readCommand);
    if (!row) return null;

    return new ChickenModel(
      row["ID"],
      row["LOTE_ID"],
      row["RACE"],
      row["BIRTHDATE"],
      row["CURRENT_WEIGHT"],
      row["HEALTH_STATUS"],
      row["DATE_READY_FOR_MEAT"],
      row["DISEASE_HISTORY"],
      row["NAME"]
    );
  }

  async create(chicken: ChickenModel): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.Chicken, chicken)
      .WithOperation(SqlWriteOperation.Create)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }

  async update(chicken: ChickenModel): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.Chicken, chicken)
      .WithOperation(SqlWriteOperation.Update)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }

  async delete(chicken: ChickenModel): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.Chicken, chicken)
      .WithOperation(SqlWriteOperation.Delete)
      .BuildWritter();
      
    await this._connection.executeNonQuery(writeCommand);
  }
}
