import AlertModel from "../models/alert.model";
import { AlertDTO } from "../dtos/alert.dto";
import { GenericCrudService } from "./genericCrud.service";
import { generateId } from "../utils/generateId";
import { alertsData } from "../../Infrastructure.Endpoint/data/alerts.data";
import { IAlertService } from "../interfaces/services/alertService.interface";
import { IChickenRepository } from "../interfaces/repositories/chickenRepository.interface";
import { IAlertRepository } from "../interfaces/repositories/alertRepository.interface";

export type ServiceResult<T> = { success: boolean; message?: string; data?: T | null };

export default class AlertService implements IAlertService {
  private readonly _alertRepository: IAlertRepository;

  constructor(alertRepository : IAlertRepository) {
    this._alertRepository = alertRepository;
  }

  async getAlerts(): Promise<AlertModel[]> {
    return this._alertRepository.getAll();
  }

  async getById(id: string): Promise<AlertModel | null> {
    return this._alertRepository.getById(id);
  }

  async addAlert(dto: AlertDTO): Promise<ServiceResult<AlertModel>> {
    const id = generateId();
    const createdAt = dto.createdAt ? new Date(dto.createdAt) : new Date();
    const resolvedAt = dto.resolvedAt ? new Date(dto.resolvedAt) : undefined;
    // if (isNaN(createdAt.getTime())) {
    //   return { success: false, message: "Invalid createdAt" };
    // }

    const alert = new AlertModel(
      id,
      dto.title,
      dto.message,
      dto.level,
      dto.isResolved ?? false,
      createdAt,
      dto.loteId,
      dto.chickenId,
      resolvedAt
    );

    await this._alertRepository.create(alert);
    return { success: true, message: "Alert created", data: alert };
  }

  async updateAlert(id: string, dto: AlertDTO): Promise<ServiceResult<AlertModel | null>> {
    const existing = await this._alertRepository.getById(id);
    
    if (!existing) {
      return { success: false, message: "Alert not found", data: null };
    }
    const payload: Partial<AlertDTO> = {...dto};

    if (payload.createdAt && typeof payload.createdAt === "string") {
      const d = new Date(payload.createdAt);
      if (isNaN(d.getTime())) return { success: false, message: "Invalid createdAt" };
      payload.createdAt = d;
    }
    if (payload.resolvedAt && typeof payload.resolvedAt === "string") {
      const d = new Date(payload.resolvedAt);
      if (isNaN(d.getTime())) return { success: false, message: "Invalid resolvedAt" };
      payload.resolvedAt = d;
    }

    Object.assign(existing, payload);
    await this._alertRepository.update(existing);
    return { success: true, message: "Alert Updated", data: existing };
  }

  async deleteAlert(id: string): Promise<{ success: boolean; message: string }> {
    const existing = await this._alertRepository.getById(id);
    if (!existing) {
      return { success: false, message: "Alert not found" };
    }
    await this._alertRepository.delete(existing);
    return { success: true, message: "Alert Deleted" };
    
  }
}