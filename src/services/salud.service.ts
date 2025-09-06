import SaludModel from "../models/salud.model";
import { SaludDTO } from "../dtos/salud.dto";
import { GenericCrudService } from "./genericCrud.service";
import { v4 as uuidv4 } from "uuid";

// Fake DB temporal
const saludData: SaludModel[] = [];

export default class SaludService {
  private repo: GenericCrudService<SaludModel>;

  constructor() {
    this.repo = new GenericCrudService<SaludModel>(saludData as any);
  }

  getAll() {
    return this.repo.getAll();
  }

  getById(id: string) {
    return this.repo.getById(id);
  }

  create(dto: SaludDTO) {
    const salud = new SaludModel(
      uuidv4(),
      dto.loteId,
      dto.disease,
      dto.treatment,
      dto.status,
      new Date(dto.createdAt ?? new Date()),
      dto.observations
    );
    this.repo.add(salud); // ✅ usamos add en lugar de create
    return salud; // devolvemos el objeto recién creado
  }

  update(id: string, dto: Partial<SaludDTO>) {
    // Ajuste para que createdAt no dé problemas (string → Date)
    if (dto.createdAt && typeof dto.createdAt === "string") {
      dto.createdAt = new Date(dto.createdAt);
    }
    return this.repo.update(id, dto as any);
  }

  delete(id: string) {
    return this.repo.delete(id);
  }
}