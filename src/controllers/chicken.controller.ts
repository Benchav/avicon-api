import ChickenService from "../services/chicken.service";
import { Request, Response } from "express";

export default class ChickenController {
  private service: ChickenService;

  constructor() {
    this.service = new ChickenService();
  }

  getChickens = async (req: Request, res: Response) => {
    try {
      const chickens = await this.service.getChickens();
      res.status(200).json(chickens);
    } catch {
      res.status(500).json({ message: "Failed to get chickens" });
    }
  };
}
