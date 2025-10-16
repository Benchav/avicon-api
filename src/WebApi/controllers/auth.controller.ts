import { RequestHandler } from "express";
import AuthService from "../../Domain.Endpoint/services/auth.service";

export default class AuthController {
  private service: AuthService;

  constructor() {
    this.service = new AuthService();
  }

  register: RequestHandler = (req, res) => {
    try {
      const result = this.service.register(req.body);
      res.status(201).json(result);
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  };

  login: RequestHandler = (req, res) => {
    const { email, password } = req.body;
    try {
      const result = this.service.login(email, password);
      res.status(200).json(result);
    } catch (e: any) {
      res.status(401).json({ message: e.message });
    }
  };
}