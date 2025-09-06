import BaseModel from "./base.model";

export enum LoteStatus {
  ACTIVO = "activo",
  INACTIVO = "inactivo",
}

export default class LoteModel extends BaseModel {
  code: string;
  name: string;
  location: string;
  capacity: number;
  createdAt: Date;
  description?: string | undefined; 
  status: LoteStatus;

  constructor(
    id: string,
    code: string,
    name: string,
    location: string,
    capacity: number,
    createdAt: Date,
    status: LoteStatus,
    description?: string
  ) {
    super(id);
    this.code = code;
    this.name = name;
    this.location = location;
    this.capacity = capacity;
    this.createdAt = createdAt;
    this.status = status;
    this.description = description;
  }
}