import BaseModel from "./base.model";

export default class FarmModel extends BaseModel {
  userId: string;
  name: string;
  address: string;
  contact: string;
  createdAt: Date;
  constructor(
    id: string,
    userId: string,
    name: string,
    address: string,
    contact: string,
    createdAt: Date
  ) {
    super(id);
    this.userId = userId;
    this.name = name;
    this.address = address;
    this.contact = contact;
    this.createdAt = createdAt;
  }
}
