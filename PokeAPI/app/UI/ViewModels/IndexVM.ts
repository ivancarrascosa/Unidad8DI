import { TYPES } from "@/app/Core/types";
import { Pokemon } from "@/app/Domain/Entities/Pokemon";
import { IUseCase } from "@/app/Domain/Interfaces/IUseCase";
import { inject, injectable } from "inversify";

@injectable()
export class IndexVM {
  private currentOffset: number = 0;

  constructor(@inject(TYPES.IUseCase) private useCase: IUseCase) {}

  async obtenerPokemon(): Promise<Pokemon[]> {
    const pokemon = await this.useCase.obtenerPokemon(this.currentOffset);
    this.currentOffset += 20;
    return pokemon;
  }

  resetOffset(): void {
    this.currentOffset = 0;
  }

  getCurrentOffset(): number {
    return this.currentOffset;
  }
}