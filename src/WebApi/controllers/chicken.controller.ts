import { ChickenDTO } from "../../Domain.Endpoint/dtos/chicken.dto";
import ChickenService from "../../Domain.Endpoint/services/chicken.service";
import { Request, Response } from "express";

export default class ChickenController {
  private service: ChickenService;

  constructor() {
    this.service = new ChickenService();
  }

  getChickens = async (req: Request, res: Response) => {
    try {
      const chickens = await this.service.getChickens();
      res.status(200).json({ success: true, data: chickens });
    } catch {
      res.status(500).json({ message: "Failed to get chickens" });
    }
  };

  getChickenById = async (req: Request, res: Response) => {
    const chickenId: string | undefined = req.params.id;

    if (!chickenId) {
      return res.status(400).json({ message: "Chicken ID is required." });
    }

    try {
      const chicken = await this.service.getById(chickenId);

      if (chicken) {
        res.status(200).json({ success: true, data: chicken});
      } else {
        res.status(404).json({ message: "Chicken not found" });
      }
    } catch {
      res.status(500).json({ message: "Failed to get chicken" });
    }
  };

  addChicken = async (req: Request, res: Response) => {
    const {
      loteId,
      race,
      birthdate,
      currentWeight,
      healthStatus,
      dateReadyForMeat,
      diseaseHistory,
      name,
    } = req.body;

    if (
      !loteId ||
      !race ||
      !birthdate ||
      !currentWeight ||
      !healthStatus ||
      !dateReadyForMeat ||
      !diseaseHistory
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newChickenData: ChickenDTO = req.body;

    try {
      const response = await this.service.addChicken(newChickenData);
      res.status(201).json({
        success:response.success,
        message: response.message,
        status: response.data,
      });
    } catch {
      res.status(400).json({ message: "Failed to add the chicken" });
    }
  };

  updateChicken = async (req: Request, res: Response) => {
    const id: string | undefined = req.params.id;
    const updatedData:ChickenDTO = req.body;

    if (!id) {
      return res.status(400).json({ message: "Chicken ID is required." });
    }
    //este es para testear que haya al menos un campo a actualizar
    if (Object.keys(updatedData).length === 0) {
        return res.status(400).json({ message: "No fields provided for update." });
    }

    try {
      const success = await this.service.updateChicken(id, updatedData);

      if (success) {
        res.status(200).json({ success: success.success, data: success.data, message: success.message });
      } else {
        res.status(404).json({ message: "Chicken not found" });
      }
    } catch {
      res.status(400).json({ message: "Failed to update chicken" });
    }
  };

  deleteChicken = async (req: Request, res: Response) => {
    const id: string | undefined = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Chicken ID is required." });
    }

    try {
      const result = await this.service.deleteChicken(id);

      if (result) {
        res.status(200).json({ success:result.success, message: "Chicken deleted successfully" });
      } else {
        res.status(404).json({ message: "Chicken not found" });
      }
    } catch {
      res.status(400).json({ message: "Failed to delete chicken" });
    }
  };
}
