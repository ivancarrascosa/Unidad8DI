import { Persona } from "../Entities/Persona";

export interface IRepositoryPersonas {
    getListadoCompletoPersonas(): Persona[];
}