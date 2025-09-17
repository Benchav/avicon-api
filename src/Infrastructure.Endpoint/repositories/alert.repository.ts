import { IAlertRepository } from "../../Domain.Endpoint/interfaces/repositories/alertRepository.interface";
import AlertModel from "../../Domain.Endpoint/models/alert.model";
import { ISingletonSqlConnection } from "../database/dbConnection.interface";
import { ISqlCommandOperationBuilder } from "../interfaces/sqlCommandOperation.interface";

export class AlertRepository implements IAlertRepository {
    private readonly _operationBuilder: ISqlCommandOperationBuilder;
    private readonly _connection: ISingletonSqlConnection;
    
    constructor(operationBuilder: ISqlCommandOperationBuilder, connection: ISingletonSqlConnection) {
        this._operationBuilder = operationBuilder;
        this._connection = connection;
    }

    getAll(): Promise<AlertModel[]> {
        throw new Error("Method not implemented.");
    }
    getById(id: string): Promise<AlertModel | null> {
        throw new Error("Method not implemented.");
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