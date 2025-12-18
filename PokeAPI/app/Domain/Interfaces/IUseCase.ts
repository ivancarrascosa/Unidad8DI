import { Pokemon } from "../Entities/Pokemon";

export interface IUseCase {
  obtenerPokemon(offset: number): Promise<Pokemon[]>;
}