import { lotesData } from "../../Infrastructure.Endpoint/data/lotes.data";
import LoteModel, { LoteStatus } from "../models/lote.model";
import { LoteDTO } from "../dtos/lote.dto";
import { generateId } from "../utils/generateId";
import { GenericCrudService } from "./genericCrud.service";


type ServiceResult<T> = { success: boolean; message?: string; data?: T };

export default class LoteService {
  private repo: GenericCrudService<LoteModel>;

  constructor() {
    this.repo = new GenericCrudService<LoteModel>(lotesData as any);
    // Note: si tu GenericCrudService requiere LoteModel, ajusta el genérico.
  }

  async getLotes(): Promise<LoteModel[]> {
    return await this.repo.getAll();
  }

  async getById(id: string): Promise<LoteModel | null> {
    return await this.repo.getById(id);
  }

  async addLote(dto: LoteDTO): Promise<ServiceResult<LoteModel>> {
    const id = generateId();
    const createdAt = dto.createdAt ? new Date(dto.createdAt) : new Date();
    if (isNaN(createdAt.getTime())) {
      return { success: false, message: "Invalid createdAt date" };
    }

    const newLote = new LoteModel(
      id,
      dto.code,
      dto.name,
      dto.location,
      dto.capacity,
      createdAt,
      dto.status,
      dto.description
    );

    const added = await this.repo.add(newLote);
    if (added) return { success: true, message: "Lote creado", data: newLote };
    return { success: false, message: "Failed to add lote" };
  }

  async updateLote(
    id: string,
    dto: Partial<LoteDTO>
  ): Promise<ServiceResult<LoteModel | null>> {
    // normalizar fecha si viene
    const payload: any = { ...dto };
    if (payload.createdAt) {
      const d = new Date(payload.createdAt);
      if (isNaN(d.getTime())) return { success: false, message: "Invalid createdAt" };
      payload.createdAt = d;
    }

    const result = await this.repo.update(id, payload);
    // result tiene la forma { success: boolean; message: string } en GenericCrudService
    if (result.success) {
      const updated = await this.getById(id);
      return { success: true, message: result.message, data: updated ?? null };
    }
    return { success: false, message: result.message };
  }

  async deleteLote(id: string): Promise<ServiceResult<null>> {
    const result = await this.repo.delete(id);
    if (result.success) return { success: true, message: result.message };
    return { success: false, message: result.message };
  }
}