import { Departamento } from '../entities/Departamento';
import { IDepartamentoUseCase } from '../interfaces/IDepartamentoUseCase';
import { IDepartamentoRepository } from '../repositories/IDepartamentoRepository';

export class DefaultDepartamentosUseCase implements IDepartamentoUseCase {
  private repository: IDepartamentoRepository;

  constructor(repository: IDepartamentoRepository) {
    this.repository = repository;
  }

  async crearDepartamento(departamento: Departamento): Promise<Departamento> {
    return this.repository.crearDepartamento(departamento);
  }

  async editarDepartamento(id: number, departamento: Departamento): Promise<Departamento> {
    return this.repository.editarDepartamento(id, departamento);
  }

  async eliminarDepartamento(id: number): Promise<boolean> {
    return this.repository.eliminarDepartamento(id);
  }

  async getDepartamentos(): Promise<Departamento[]> {
    return this.repository.getDepartamentos();
  }

  async getDepartamentoById(id: number): Promise<Departamento> {
    return this.repository.getDepartamentoById(id);
  }
}