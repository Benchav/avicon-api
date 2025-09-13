import { HealthStatus } from "../models/salud.model";

export interface SaludDTO {
  loteId: string;
  disease: string;
  treatment: string;
  status: HealthStatus;
  createdAt?: Date | string;
  observations?: string;
}