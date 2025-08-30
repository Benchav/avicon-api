import { Health } from "./health.enum";

export default class ChickenModel {
  id: string;
  loteId: string;
  name?: string | undefined;
  race: string;
  birthdate: string;
  currentWeight: string;
  healthStatus: Health;
  dateReadyForMeat: Date;
  diseaseHistory: string;

  constructor(
    id: string,
    loteId: string,
    race: string,
    birthdate: string,
    currentWeight: string,
    healthStatus: Health,
    dateReadyForMeat: Date,
    diseaseHistory: string,
    name?: string,
  ) {
    this.id =id;
    this.loteId=loteId;
    this.race=race;
    this.birthdate=birthdate;
    this.currentWeight= currentWeight;
    this.healthStatus=healthStatus;
    this.dateReadyForMeat=dateReadyForMeat;
    this.diseaseHistory=diseaseHistory;
    this.name=name;
  }
}
