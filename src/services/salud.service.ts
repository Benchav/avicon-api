import SaludModel from "../models/salud.model";
import { SaludDTO } from "../dtos/salud.dto";
import { GenericCrudService } from "./genericCrud.service";
import { v4 as uuidv4 } from "uuid";


const saludData: SaludModel[] = [];

export default class SaludService {
  private repo: GenericCrudService<SaludModel>;

  constructor() {
    this.repo = new GenericCrudService<SaludModel>(saludData);
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
    this.repo.add(salud); 
  }

  update(id: string, dto: Partial<SaludDTO>) {

    if (dto.createdAt && typeof dto.createdAt === "string") {
      dto.createdAt = new Date(dto.createdAt);
    }
    return this.repo.update(id, dto as any);
  }

  delete(id: string) {
    return this.repo.delete(id);
  }
}