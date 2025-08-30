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

  getChickenById=async(req:Request, res:Response)=>{
    const chickenId: string | undefined = req.params.id;

    if (!chickenId) {
        return res.status(400).json({ message: "Chicken ID is required." });
    }

    try {
      const chicken = await this.service.getById(chickenId);

      if (chicken) {
        res.status(200).json(chicken);
      } else {
        res.status(404).json({ message: "Chicken not found" });
      }
    } catch{
      res.status(500).json({ message: "Failed to get chicken" });
    }
  }
}
