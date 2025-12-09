import { injectable } from "inversify";
import { IPersonasUseCase } from "../Interfaces/IPersonasUseCase";
import { IRepositoryPersonas } from "../Repositories/IRepositoryPersonas";
import { inject } from "inversify";
import { Persona } from "../Entities/Persona";
import { TYPES } from "@/app/Core/types";

@injectable()
export class PersonasUseCase implements IPersonasUseCase {

    constructor(
        @inject(TYPES.IRepositoryPersonas)
        private RepositoryPersonas: IRepositoryPersonas
    ) {}

    getListaPersonas(): Persona[] {
        return this.RepositoryPersonas.getListadoCompletoPersonas();
    }
}