import { inject, injectable } from "inversify";
import { Pokemon } from "../Entities/Pokemon";
import { IRepository } from "../Repositories/IRepository";
import { IUseCase } from "../Interfaces/IUseCase";
import { TYPES } from "../../Core/types";

@injectable()
export class DefaultUseCase implements IUseCase {
  constructor(@inject(TYPES.IRepository) private repository: IRepository) {}

  async obtenerPokemon(offset: number): Promise<Pokemon[]> {
    return await this.repository.obtenerPokemon(offset);
  }
}