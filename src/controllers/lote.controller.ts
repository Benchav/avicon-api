import { Request, Response } from "express";
import LoteService from "../services/lote.service";
import { LoteDTO } from "../dtos/lote.dto";

export default class LoteController {
  private service: LoteService;

  constructor() {
    this.service = new LoteService();
  }

  getLotes = async (req: Request, res: Response) => {
    try {
      const lotes = await this.service.getLotes();
      res.status(200).json({ success: true, data: lotes });
    } catch (err) {
      console.error("getLotes error:", err);
      res.status(500).json({ success: false, message: "Failed to get lotes" });
    }
  };

  getLoteById = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ success: false, message: "Lote ID is required." });

    try {
      const lote = await this.service.getById(id);
      if (lote) return res.status(200).json({ success: true, data: lote });
      return res.status(404).json({ success: false, message: "Lote not found" });
    } catch (err) {
      console.error("getLoteById error:", err);
      res.status(500).json({ success: false, message: "Failed to get lote" });
    }
  };

  addLote = async (req: Request, res: Response) => {
    const { code, name, location, capacity, createdAt, status, description } =
      req.body as LoteDTO;

    if (!code || !name || !location || capacity === undefined || !status) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {
      const result = await this.service.addLote({
        code,
        name,
        location,
        capacity,
        createdAt,
        status,
        description,
      });

      if (result.success) {
        return res.status(201).json({ success: true, message: result.message, data: result.data });
      }
      return res.status(400).json({ success: false, message: result.message });
    } catch (err) {
      console.error("addLote error:", err);
      res.status(500).json({ success: false, message: "Failed to add lote" });
    }
  };

  updateLote = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ success: false, message: "Lote ID is required." });

    const updatedData = req.body as Partial<LoteDTO>;
    if (Object.keys(updatedData).length === 0) {
      return res.status(400).json({ success: false, message: "No fields provided for update." });
    }

    try {
      const result = await this.service.updateLote(id, updatedData);
      if (result.success) {
        return res.status(200).json({ success: true, message: result.message, data: result.data });
      }
      // si service devuelve success=false, lo consideramos 404 o 400 según message
      return res.status(404).json({ success: false, message: result.message });
    } catch (err) {
      console.error("updateLote error:", err);
      res.status(500).json({ success: false, message: "Failed to update lote" });
    }
  };

  deleteLote = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ success: false, message: "Lote ID is required." });

    try {
      const result = await this.service.deleteLote(id);
      if (result.success) return res.status(200).json({ success: true, message: result.message });
      return res.status(404).json({ success: false, message: result.message });
    } catch (err) {
      console.error("deleteLote error:", err);
      res.status(500).json({ success: false, message: "Failed to delete lote" });
    }
  };
}