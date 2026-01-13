import { Persona } from '../entities/Persona';

export interface IPersonaRepository {
  crearPersona(persona: Persona): Promise<Persona>;
  editarPersona(id: number, persona: Persona): Promise<Persona>;
  eliminarPersona(id: number): Promise<boolean>;
  getPersonas(): Promise<Persona[]>;
  getPersonaById(id: number): Promise<Persona>;
}