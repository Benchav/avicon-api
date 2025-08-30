import { chickenData } from "../data/pollos.data";
import { ChickenDTO } from "../dtos/chicken.dto";
import ChickenModel from "../models/chicken.model";
import { generateId } from "../utils/generateId";
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

  async addChicken(chicken: ChickenDTO): Promise<boolean> {
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

    return await this.chickenService.add(newChicken);
  }

  async updateChicken(id:string,chicken: ChickenModel):Promise<{ success: boolean; message: string }>{
    return await this.chickenService.update(id, chicken);
  }
}
