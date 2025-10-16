import { UserRole } from "../models/user.model";

export interface UserDTO {
  username: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt?: Date | string;
}