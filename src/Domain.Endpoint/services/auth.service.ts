import bcrypt from "bcryptjs";
import { userData } from "../../Infrastructure.Endpoint/data/user.data";
import UserModel, { UserRole } from "../models/user.model";
import { generateAccesToken } from "../../WebApi/utils/jwtUtils";

export default class AuthService {

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

    const token = generateAccesToken(user);
    console.log(token);

    return {
      message: "Inicio de sesión exitoso",
      token,
      user: { id: user.id, username: user.username, email: user.email, role: user.role },
    };
  }

}