import ReportModel from "../models/report.model";
import { ReportDTO } from "../dtos/report.dto";
import { GenericCrudService } from "./genericCrud.service";
import { generateId } from "../utils/generateId";
import { reportesData } from "../../Infrastructure.Endpoint/data/reportes.data";

type ServiceResult<T> = { success: boolean; message?: string; data?: T | null };

export default class ReportService {
  private repo: GenericCrudService<ReportModel>;

  constructor() {
    this.repo = new GenericCrudService<ReportModel>(reportesData);
  }

  async getReports(): Promise<ReportModel[]> {
    return this.repo.getAll();
  }

  async getById(id: string): Promise<ReportModel | null> {
    return this.repo.getById(id);
  }

  async addReport(dto: ReportDTO): Promise<ServiceResult<ReportModel>> {
    const id = generateId();
    const createdAt = dto.createdAt ? new Date(dto.createdAt) : new Date();
    if (isNaN(createdAt.getTime())) return { success: false, message: "Invalid createdAt" };

    const report = new ReportModel(
      id,
      dto.title,
      dto.description,
      dto.type,
      dto.status ?? ReportModel ? dto.status ?? (ReportModel as any) : dto.status ?? undefined, // fallback removed by next line
      // we'll set status default below for safety
      createdAt,
      dto.loteId,
      dto.createdBy,
      dto.resolvedAt ? new Date(dto.resolvedAt) : undefined
    );

    // ensure status default if undefined:
    if (!report.status) {
      report.status = (typeof dto.status !== "undefined" ? dto.status : "pendiente") as any;
    }

    const added = this.repo.add(report);
    if (added) return { success: true, message: "Report created", data: report };
    return { success: false, message: "Failed to create report" };
  }

  async updateReport(id: string, dto: Partial<ReportDTO>): Promise<ServiceResult<ReportModel | null>> {
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

    const result = this.repo.update(id, payload as Partial<ReportModel>);
    if (result.success) {
      const updated = await this.getById(id);
      return { success: true, message: result.message, data: updated ?? null };
    }
    return { success: false, message: result.message };
  }

  async deleteReport(id: string): Promise<ServiceResult<null>> {
    const result = this.repo.delete(id);
    if (result.success) return { success: true, message: result.message };
    return { success: false, message: result.message };
  }
}