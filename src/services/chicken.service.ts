import { chickenData } from "../data/pollos.data";
import { ChickenDTO } from "../dtos/chicken.dto";
import ChickenModel from "../models/chicken.model";
import { generateId } from "../utils/generateId";
import { ServiceResult } from "./alert.service";
import { GenericCrudService } from "./genericCrud.service";

export default class ChickenService {
  private chickenService: GenericCrudService<ChickenModel>;
  constructor() {
    this.chickenService = new GenericCrudService<ChickenModel>(chickenData);
  }

  async getChickens(): Promise<ChickenModel[]> {
    return await this.chickenService.getAll();
  }

  async getById(id: string): Promise<ChickenModel | null> {
    return await this.chickenService.getById(id);
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
    const added = await this.chickenService.add(newChicken);
    if (added) return { success: true, message: "Alert created", data: newChicken };
    return { success: false, message: "Failed to create alert" };
  }

  async updateChicken(id:string,chicken: ChickenDTO):Promise<{ success: boolean; message: string }>{
    return await this.chickenService.update(id, chicken);
  }

  async deleteChicken(id:string):Promise<{ success: boolean; message: string }>{
    return await this.chickenService.delete(id);
  }
}