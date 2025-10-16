import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userData } from "../../Infrastructure.Endpoint/data/user.data";
import UserModel, { UserRole } from "../models/user.model";

export default class AuthService {
  private JWT_SECRET = "clave_super_secreta"; 

  register(dto: { username: string; email: string; password: string; role?: UserRole }) {
    const exists = userData.find(u => u.email === dto.email);
    if (exists) throw new Error("El correo ya está registrado");

    const hashedPassword = bcrypt.hashSync(dto.password, 10);

    const user = new UserModel(
      (userData.length + 1).toString(),
      dto.username,
      dto.email,
      hashedPassword,
      dto.role || UserRole.EMPLEADO,
      new Date()
    );

    userData.push(user);

    return {
      message: "Usuario registrado correctamente",
      user: { id: user.id, username: user.username, email: user.email, role: user.role },
    };
  }

  login(email: string, password: string) {
    const user = userData.find(u => u.email === email);
    if (!user) throw new Error("Usuario no encontrado");

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) throw new Error("Contraseña incorrecta");

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      this.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return {
      message: "Inicio de sesión exitoso",
      token,
      user: { id: user.id, username: user.username, email: user.email, role: user.role },
    };
  }

  verifyToken(token: string) {
    try {
      return jwt.verify(token, this.JWT_SECRET);
    } catch {
      throw new Error("Token inválido o expirado");
    }
  }
}