import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './types';

// Importa tus interfaces de repositorios
import { IPersonaRepository } from '../Domain/repositories/IPersonaRepository';
import { IDepartamentoRepository } from '../Domain/repositories/IDepartamentoRepository';

// Importa tus implementaciones de repositorios
import { PersonaRepository } from '../data/repositories/PersonaRepository';
import { DepartamentoRepository } from '../data/repositories/DepartamentoRepository';

// Importa tus interfaces de use cases
import { IPersonaUseCase } from '../Domain/interfaces/IPersonaUseCase';
import { IDepartamentoUseCase } from '../Domain/interfaces/IDepartamentoUseCase';

// Importa tus implementaciones de use cases
import { DefaultPersonasUseCase } from '../Domain/useCases/DefaultPersonasUseCase';
import { DefaultDepartamentosUseCase } from '../Domain/useCases/DefaultDepartamentosUseCase';


const container = new Container();

// Bind Repositories
container.bind<IPersonaRepository>(TYPES.IRepositoryPersonas).to(PersonaRepository).inSingletonScope();
container.bind<IDepartamentoRepository>(TYPES.IRepositoryDepartamentos).to(DepartamentoRepository).inSingletonScope();

// Bind Use Cases
container.bind<IPersonaUseCase>(TYPES.IUseCasePersonas).to(DefaultPersonasUseCase).inSingletonScope();
container.bind<IDepartamentoUseCase>(TYPES.IUseCaseDepartamentos).to(DefaultDepartamentosUseCase).inSingletonScope();

export { container };