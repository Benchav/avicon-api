import { chickenData } from "../data/pollos.data";
import ChickenModel from "../models/chicken.model";
import { GenericCrudService } from "./genericCrud.service";

export default class ChickenService {
  private chickenService: GenericCrudService<ChickenModel>;
  constructor() {
    this.chickenService = new GenericCrudService<ChickenModel>(chickenData);
  }

  async getChickens():Promise<ChickenModel[]> {
    return await this.chickenService.getAll();
  }
}
