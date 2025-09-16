import ChickenModel from "../../models/chicken.model";

export interface IChickenRepository {
  getAll(): Promise<ChickenModel[]>;
  getById(id: string): Promise<ChickenModel | null>;
  create(chicken: ChickenModel): Promise<void>;
  update(chicken: ChickenModel): Promise<void>;
  delete(chicken: ChickenModel): Promise<void>;
}
