import { Health } from "../models/health.enum";

export interface ChickenDTO {
  loteId: string;
  race: string;
  birthdate: string;
  currentWeight: string;
  healthStatus: Health;
  dateReadyForMeat: Date;
  diseaseHistory: string;
  name?: string | undefined;
}
