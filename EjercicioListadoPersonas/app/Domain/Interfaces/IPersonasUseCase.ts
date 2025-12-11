import { Persona } from "../Entities/Persona";

export interface IPersonasUseCase {
    getListaPersonas(): Promise<Persona[]>;
}