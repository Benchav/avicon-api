import { RequestHandler } from "express";
import UserService from "../../Domain.Endpoint/services/user.service";

type IdParam = { id: string };

export default class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  getAll: RequestHandler = (req, res) => {
    const users = this.service.getAll();
    res.status(200).json(users);
  };

  getById: RequestHandler<IdParam> = (req, res) => {
    const { id } = req.params;
    try {
      const user = this.service.getById(id);
      res.status(200).json(user);
    } catch {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  };

  create: RequestHandler = (req, res) => {
    try {
      const created = this.service.create(req.body);
      res.status(201).json(created);
    } catch {
      res.status(400).json({ message: "Datos inválidos" });
    }
  };

  update: RequestHandler<IdParam> = (req, res) => {
    const { id } = req.params;
    const result = this.service.update(id, req.body);
    if (!result.success) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario actualizado correctamente" });
  };

  delete: RequestHandler<IdParam> = (req, res) => {
    const { id } = req.params;
    const result = this.service.delete(id);
    if (!result.success) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  };
}