import BaseModel from "./base.model";

export enum UserRole {
  ADMIN = "admin",
  EMPLEADO = "empleado",
  SUPERVISOR = "supervisor",
}

export default class UserModel extends BaseModel {
  username: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;

  constructor(
    id: string,
    username: string,
    email: string,
    password: string,
    role: UserRole,
    createdAt: Date
  ) {
    super(id);
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.createdAt = createdAt;
  }
}