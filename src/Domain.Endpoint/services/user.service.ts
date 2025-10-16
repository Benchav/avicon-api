import { v4 as uuidv4 } from "uuid";
import UserModel, { UserRole } from "../models/user.model";
import { UserDTO } from "../dtos/user.dto";
import { GenericCrudService } from "./genericCrud.service";
import { userData } from "../../Infrastructure.Endpoint/data/user.data";

export default class UserService {
  private repo: GenericCrudService<UserModel>;

  constructor() {
    this.repo = new GenericCrudService<UserModel>(userData);
  }

  getAll() {
    return this.repo.getAll();
  }

  getById(id: string) {
    return this.repo.getById(id);
  }

  create(dto: UserDTO) {
    const user = new UserModel(
      uuidv4(),
      dto.username,
      dto.email,
      dto.password, // Aquí luego se puede aplicar hash con bcrypt
      dto.role,
      new Date(dto.createdAt ?? new Date())
    );

    this.repo.add(user);
    return user;
  }

  update(id: string, dto: Partial<UserDTO>) {
    if (dto.createdAt && typeof dto.createdAt === "string") {
      dto.createdAt = new Date(dto.createdAt);
    }
    return this.repo.update(id, dto as any);
  }

  delete(id: string) {
    return this.repo.delete(id);
  }
}