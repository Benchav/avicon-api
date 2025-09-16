import { ChickenDTO } from "../../dtos/chicken.dto";
import ChickenModel from "../../models/chicken.model";
import { ServiceResult } from "../../services/alert.service";

export interface IChickenService {
  getChickens(): Promise<ChickenModel[]>;
  getById(id: string): Promise<ChickenModel | null>;
  addChicken(chicken: ChickenDTO): Promise<ServiceResult<ChickenModel>>;
  updateChicken(id: string, chicken: ChickenDTO): Promise<ServiceResult<ChickenModel | null>>;
  deleteChicken(id: string): Promise<{ success: boolean; message: string }>;
}