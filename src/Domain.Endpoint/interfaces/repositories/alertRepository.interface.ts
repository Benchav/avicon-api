import AlertModel from "../../models/alert.model";

export interface IAlertRepository {
  getAll(): Promise<AlertModel[]>;
  getById(id: string): Promise<AlertModel | null>;
  create(alert: AlertModel): Promise<void>;
  update(alert: AlertModel): Promise<void>;
  delete(alert: AlertModel): Promise<void>;
}
