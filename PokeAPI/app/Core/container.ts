import { Container } from "inversify";
import { IRepository } from "../Domain/Repositories/IRepository";
import { IUseCase } from "../Domain/Interfaces/IUseCase";
import { DefaultUseCase } from "../Domain/UseCases/DefaultUseCase";
import { PokeApiRepository } from "../Data/Repositories/PokeApiRepository";
import { TYPES } from "./types";
import { IndexVM } from "../UI/ViewModels/IndexVM";

const container = new Container();

// Vinculamos la interfaz con su implementación concreta
container.bind<IRepository>(TYPES.IRepository).to(PokeApiRepository);
container.bind<IUseCase>(TYPES.IUseCase).to(DefaultUseCase);
container.bind<IndexVM>(TYPES.IndexVM).to(IndexVM);

export { container };