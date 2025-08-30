import ChickenModel from '../models/chicken.model';
import { Health } from '../models/health.enum';

export const chickenData: ChickenModel[] = [
  {
    id: '1',
    loteId: 'A1',
    name: 'Gallito',
    race: 'Rhode Island Red',
    birthdate: '2023-01-01',
    currentWeight: '5kg',
    healthStatus: Health.HEALTHY,
    dateReadyForMeat: new Date('2023-07-01'),
    diseaseHistory: 'None',
  },
  {
    id: '2',
    loteId: 'A1',
    name: 'Pablito',
    race: 'Leghorn',
    birthdate: '2023-01-05',
    currentWeight: '4.5kg',
    healthStatus: Health.HEALTHY,
    dateReadyForMeat: new Date('2023-07-05'),
    diseaseHistory: 'None',
  },
];