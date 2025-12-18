import { Pokemon } from "@/app/Domain/Entities/Pokemon";
import { IRepository } from "@/app/Domain/Repositories/IRepository";
import { injectable } from "inversify";

@injectable()
export class PokeApiRepository implements IRepository {
  private readonly BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
  private readonly LIMIT = 20;

  async obtenerPokemon(offset: number): Promise<Pokemon[]> {
    try {
      const url = `${this.BASE_URL}?limit=${this.LIMIT}&offset=${offset}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // La API devuelve un objeto con una propiedad 'results' que contiene el array de pokemon
      if (!data.results || !Array.isArray(data.results)) {
        throw new Error('Invalid API response format');
      }
      
      return data.results.map((pokemon: any) => 
        new Pokemon(pokemon.name, pokemon.url)
      );
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
      throw error;
    }
  }
}