import { Request, Response } from "express";
import AlertService from "../../Domain.Endpoint/services/alert.service";
import { AlertDTO } from "../../Domain.Endpoint/dtos/alert.dto";

type IdParam = { id: string };

export default class AlertController {
  private service: AlertService;

  constructor() {
    this.service = new AlertService();
  }

  getAll = async (req: Request, res:Response) => {
    try {
      const items = await this.service.getAlerts();
      res.status(200).json({ success: true, data: items });
    } catch (err) {
      console.error("getAll alerts error:", err);
      res.status(500).json({ success: false, message: "Failed to get alerts" });
    }
  };

  getById= async (req: Request, res:Response) => {
    const id: string | undefined = req.params.id;
     if (!id) {
      return res.status(400).json({ message: "Alert ID is required." });
    }
    try {
      const item = await this.service.getById(id);
      if (!item) return res.status(404).json({ success: false, message: "Alert not found" });
      res.status(200).json({ success: true, data: item });
    } catch (err) {
      console.error("getById alert error:", err);
      res.status(500).json({ success: false, message: "Failed to get alert" });
    }
  };

  addAlert= async (req: Request, res: Response) => {
    try {
      const dto = req.body as AlertDTO;

      if (!dto.title || !dto.message || !dto.level) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
      }
      const result = await this.service.addAlert(dto);
      if (result.success) return res.status(201).json({ success: true, data: result.data, message: result.message });
      return res.status(400).json({ success: false, message: result.message });
    } catch (err) {
      console.error("addAlert error:", err);
      res.status(500).json({ success: false, message: "Failed to create alert" });
    }
  };

  updateAlert: RequestHandler<IdParam> = async (req, res) => {
    const { id } = req.params;
    const dto = req.body as Partial<AlertDTO>;
    if (Object.keys(dto).length === 0) {
      return res.status(400).json({ success: false, message: "No fields provided for update" });
    }
    try {
      const result = await this.service.updateAlert(id, dto);
      if (result.success) return res.status(200).json({ success: true, data: result.data, message: result.message });
      return res.status(404).json({ success: false, message: result.message });
    } catch (err) {
      console.error("updateAlert error:", err);
      res.status(500).json({ success: false, message: "Failed to update alert" });
    }
  };

  deleteAlert: RequestHandler<IdParam> = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await this.service.deleteAlert(id);
      if (result.success) return res.status(200).json({ success: true, message: result.message });
      return res.status(404).json({ success: false, message: result.message });
    } catch (err) {
      console.error("deleteAlert error:", err);
      res.status(500).json({ success: false, message: "Failed to delete alert" });
    }
  };
}