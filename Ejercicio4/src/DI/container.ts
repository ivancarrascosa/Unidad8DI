import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './types';

// Importa tus interfaces de repositorios
import { IPersonaRepository } from '../Domain/repositories/IPersonaRepository';
import { IDepartamentoRepository } from '../Domain/repositories/IDepartamentoRepository';

// Importa tus implementaciones de repositorios
import { PersonasRepositoryAzure } from '../data/repositories/PersonasRepositoryAzure';
import { DepartamentosRepositoryAzure } from '../data/repositories/DepartamentosRepositoryAzure';

// Importa tus interfaces de use cases
import { IUseCasePersonas } from '../Domain/interfaces/IUseCasePersonas';
import { IUseCaseDepartamentos } from '../Domain/interfaces/IUseCaseDepartamentos';

// Importa tus implementaciones de use cases
import { DefaultPersonasUseCase } from '../Domain/useCases/DefaultPersonasUseCase';
import { DefaultDepartamentosUseCase } from '../Domain/useCases/DefaultDepartamentosUseCase';

const container = new Container();

// Bind Repositories
container.bind<IPersonaRepository>(TYPES.IRepositoryPersonas).to(PersonasRepositoryAzure).inSingletonScope();
container.bind<IDepartamentoRepository>(TYPES.IRepositoryDepartamentos).to(DepartamentosRepositoryAzure).inSingletonScope();

// Bind Use Cases
container.bind<IUseCasePersonas>(TYPES.IUseCasePersonas).to(DefaultPersonasUseCase).inSingletonScope();
container.bind<IUseCaseDepartamentos>(TYPES.IUseCaseDepartamentos).to(DefaultDepartamentosUseCase).inSingletonScope();

export { container };