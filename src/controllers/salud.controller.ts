import { RequestHandler } from "express";
import SaludService from "../services/salud.service";

type IdParam = { id: string };

export default class SaludController {
  private service: SaludService;

  constructor() {
    this.service = new SaludService();
  }

  getAll: RequestHandler = (req, res) => {
    const items = this.service.getAll();
    res.status(200).json(items);
  };

  getById: RequestHandler<IdParam> = (req, res) => {
    const { id } = req.params;
    try {
      const item = this.service.getById(id); 
      res.status(200).json(item);
    } catch {
      res.status(404).json({ message: "Registro de salud no encontrado" });
    }
  };

  create: RequestHandler = (req, res) => {
    try {
      const created = this.service.create(req.body);
      res.status(201).json(created);
    } catch (e) {
      res.status(400).json({ message: "Datos inválidos" });
    }
  };

  update: RequestHandler<IdParam> = (req, res) => {
    const { id } = req.params;
    const result = this.service.update(id, req.body); 
    if (!result.success) {
      return res.status(404).json({ message: "Registro de salud no encontrado" });
    }
    res.status(200).json({ message: "Registro actualizado correctamente" });
  };

  delete: RequestHandler<IdParam> = (req, res) => {
    const { id } = req.params;
    const result = this.service.delete(id); 
    if (!result.success) {
      return res.status(404).json({ message: "Registro de salud no encontrado" });
    }
    res.status(200).json({ message: "Registro eliminado correctamente" });
  };
}
