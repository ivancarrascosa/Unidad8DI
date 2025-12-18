import { Pokemon } from "../Entities/Pokemon";

export interface IRepository {
  obtenerPokemon(offset: number): Promise<Pokemon[]>;
}