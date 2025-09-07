import AlertModel from "../models/alert.model";
import { AlertDTO } from "../dtos/alert.dto";
import { GenericCrudService } from "./genericCrud.service";
import { generateId } from "../utils/generateId";
import { alertsData } from "../data/alerts.data";

type ServiceResult<T> = { success: boolean; message?: string; data?: T | null };

export default class AlertService {
  private repo: GenericCrudService<AlertModel>;

  constructor() {
    this.repo = new GenericCrudService<AlertModel>(alertsData);
  }

  async getAlerts(): Promise<AlertModel[]> {
    return this.repo.getAll();
  }

  async getById(id: string): Promise<AlertModel | null> {
    return this.repo.getById(id);
  }

  async addAlert(dto: AlertDTO): Promise<ServiceResult<AlertModel>> {
    const id = generateId();
    const createdAt = dto.createdAt ? new Date(dto.createdAt) : new Date();
    if (isNaN(createdAt.getTime())) {
      return { success: false, message: "Invalid createdAt" };
    }

    const alert = new AlertModel(
      id,
      dto.title,
      dto.message,
      dto.level,
      dto.isResolved ?? false,
      createdAt,
      dto.loteId,
      dto.chickenId,
      dto.resolvedAt ? new Date(dto.resolvedAt) : undefined
    );

    const added = this.repo.add(alert);
    if (added) return { success: true, message: "Alert created", data: alert };
    return { success: false, message: "Failed to create alert" };
  }

  async updateAlert(id: string, dto: Partial<AlertDTO>): Promise<ServiceResult<AlertModel | null>> {
    const payload: any = { ...dto };

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

    const result = this.repo.update(id, payload as Partial<AlertModel>);
    if (result.success) {
      const updated = await this.getById(id);
      return { success: true, message: result.message, data: updated ?? null };
    }
    return { success: false, message: result.message };
  }

  async deleteAlert(id: string): Promise<ServiceResult<null>> {
    const result = this.repo.delete(id);
    if (result.success) return { success: true, message: result.message };
    return { success: false, message: result.message };
  }
}