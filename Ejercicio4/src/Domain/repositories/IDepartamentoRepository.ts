import { Departamento } from '../entities/Departamento';

export interface IDepartamentoRepository {
  crearDepartamento(departamento: Departamento): Promise<Departamento>;
  editarDepartamento(id: number, departamento: Departamento): Promise<Departamento>;
  eliminarDepartamento(id: number): Promise<boolean>;
  getDepartamentos(): Promise<Departamento[]>;
  getDepartamentoById(id: number): Promise<Departamento>;
}