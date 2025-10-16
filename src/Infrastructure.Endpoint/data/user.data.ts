import UserModel, { UserRole } from "../../Domain.Endpoint/models/user.model";

export const userData: UserModel[] = [
  new UserModel(
    "1",
    "adminUser",
    "oscar.molina@gmail.com",
    "hashed_password_123",
    UserRole.ADMIN,
    new Date("2025-10-01")
  ),
  new UserModel(
    "2",
    "empleado01",
    "manolo@gmail.com",
    "hashed_password_456",
    UserRole.EMPLEADO,
    new Date("2025-05-10")
  ),
];