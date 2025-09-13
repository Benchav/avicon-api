import { LoteStatus } from "../models/lote.model";

export interface LoteDTO {
  code: string;
  name: string;
  location: string;
  capacity: number;
  createdAt?: Date | string | undefined;
  status: LoteStatus;
  description?: string | undefined;
}