import { Container } from "inversify";
import "reflect-metadata";
import { TYPES } from "./types";
import { IPersonasUseCase } from "../Domain/Interfaces/IPersonasUseCase";
import { IRepositoryPersonas } from "../Domain/Repositories/IRepositoryPersonas";
import { PersonasRepository } from "../Data/Repositories/PersonasRepository";
import { PersonasUseCase } from "../Domain/UseCases/PersonasUseCase";
import { PersonasListaVM } from "../UI/ViewModels/PersonasListaVM";


const container = new Container();


// Vinculamos la interfaz con su implementación concreta
container.bind<IRepositoryPersonas>(TYPES.IRepositoryPersonas).to(PersonasRepository);
container.bind<IPersonasUseCase>(TYPES.IPersonasUseCase).to(PersonasUseCase);
container.bind<PersonasListaVM>(TYPES.PersonasListaVM).to(PersonasListaVM);
export { container };