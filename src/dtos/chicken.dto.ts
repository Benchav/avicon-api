import { Health } from "../models/health.enum";

export interface ChickenDTO {
  name?: string | undefined;
  race: string;
  birthdate: string;
  currentWeight: string;
  healthStatus: Health;
  dateReadyForMeat: Date;
  diseaseHistory: string;
}
