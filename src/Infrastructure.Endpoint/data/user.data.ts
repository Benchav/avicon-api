import UserModel, { UserRole } from "../../Domain.Endpoint/models/user.model";
import bcrypt from "bcryptjs";

export const userData: UserModel[] = [
  new UserModel(
    "1",
    "adminUser",
    "oscar.molina@gmail.com",
    bcrypt.hashSync("123456789", 10),
    UserRole.ADMIN,
    new Date("2025-10-01")
  ),
  new UserModel(
    "2",
    "empleado01",
    "manolo@gmail.com",
    bcrypt.hashSync("123456789", 10),
    UserRole.EMPLEADO,
    new Date("2025-05-10")
  ),
];