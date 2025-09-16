import { SqlCommandOperationBuilder } from './../Infrastructure.Endpoint/builders/sqlCommandOperation.builder';
// src/container.ts
import 'reflect-metadata';
import { container } from 'tsyringe';
import { ISingletonSqlConnection } from '../Infrastructure.Endpoint/database/dbConnection.interface';
import { SingletonSqlConnection } from '../Infrastructure.Endpoint/database/dbConnection';
import { IEntitiesService } from '../Infrastructure.Endpoint/interfaces/entitiesService.interface';
import { EntitiesService } from '../Infrastructure.Endpoint/services/entitiesService';
import { ISqlCommandOperationBuilder } from '../Infrastructure.Endpoint/interfaces/sqlCommandOperation.interface';
import { IChickenRepository } from '../Domain.Endpoint/interfaces/repositories/chickenRepository.interface';
import { ChickenRepository } from '../Infrastructure.Endpoint/repositories/chicken.repository';
import { IChickenService } from '../Domain.Endpoint/interfaces/services/chickenService.interface';
import ChickenService from '../Domain.Endpoint/services/chicken.service';
import ChickenController from './controllers/chicken.controller';

// Registrar clases concretas
container.registerSingleton<ISingletonSqlConnection>('ISingletonSqlConnection', SingletonSqlConnection);
container.registerSingleton<IEntitiesService>('IEntityService', EntitiesService);
container.register<ISqlCommandOperationBuilder>('IOperationBuilder', { useClass: SqlCommandOperationBuilder });
container.register<IChickenRepository>('IChickenRepository', { useClass: ChickenRepository });
container.register<IChickenService>('IChickenService', { useClass: ChickenService });
container.register<ChickenController>('ChickenController', { useClass: ChickenController });
