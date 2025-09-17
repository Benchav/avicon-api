import AlertModel from "../../models/alert.model";
import { AlertDTO } from "../../dtos/alert.dto";
import { ServiceResult } from "../../services/alert.service";

export interface IAlertService {
  getAlerts(): Promise<AlertModel[]>;
  getById(id: string): Promise<AlertModel | null>;
  addAlert(dto: AlertDTO): Promise<ServiceResult<AlertModel>>;
  updateAlert(id: string, dto: Partial<AlertDTO>): Promise<ServiceResult<AlertModel | null>>;
  deleteAlert(id: string): Promise<ServiceResult<{ success: boolean; message: string }>>;
}
