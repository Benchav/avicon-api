import { IChickenRepository } from "../interfaces/repositories/chickenRepository.interface";
import ChickenModel from "../models/chicken.model";
import { ChickenDTO } from "../dtos/chicken.dto";
import { generateId } from "../utils/generateId";
import { ServiceResult } from "./alert.service";
import { IChickenService } from "../interfaces/services/chickenService.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export default class ChickenService implements IChickenService {
  private readonly _chickenRepository: IChickenRepository

  constructor(@inject('IChickenRepository') chickenRepository: IChickenRepository) {
    this._chickenRepository=chickenRepository;
  }

  async getChickens(): Promise<ChickenModel[]> {
    return await this._chickenRepository.getAll();
  }

  async getById(id: string): Promise<ChickenModel | null> {
    return await this._chickenRepository.getById(id);
  }

  async addChicken(chicken: ChickenDTO): Promise<ServiceResult<ChickenModel>> {
    const id = generateId();
    const newChicken = new ChickenModel(
      id,
      chicken.loteId,
      chicken.race,
      chicken.birthdate,
      chicken.currentWeight,
      chicken.healthStatus,
      chicken.dateReadyForMeat,
      chicken.diseaseHistory,
      chicken.name
    );

    await this._chickenRepository.create(newChicken);

    return { success: true, message: "Chicken created", data: newChicken };
  }

  async updateChicken(
    id: string,
    chicken: ChickenDTO
  ): Promise<ServiceResult<ChickenModel | null>> {
    const existing = await this._chickenRepository.getById(id);
    if (!existing) {
      return { success: false, message: "Chicken not found", data: null };
    }

    // actualizar solo las propiedades necesarias
    Object.assign(existing, chicken);
    await this._chickenRepository.update(existing);

    return { success: true, message: "Chicken updated", data: existing };
  }

  async deleteChicken(
    id: string
  ): Promise<{ success: boolean; message: string }> {
    const existing = await this._chickenRepository.getById(id);
    if (!existing) {
      return { success: false, message: "Chicken not found" };
    }

    await this._chickenRepository.delete(existing);
    return { success: true, message: "Chicken deleted" };
  }
}
