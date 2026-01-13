import { injectable } from 'inversify';
import { Departamento } from '../../Domain/entities/Departamento';
import { IDepartamentoRepository } from '../../Domain/repositories/IDepartamentoRepository';
import { API_URL, ENDPOINTS } from '../services/APIConnection';

@injectable()
export class DepartamentoRepository implements IDepartamentoRepository {
  constructor() {}

  async crearDepartamento(departamento: Departamento): Promise<Departamento> {
    try {
      const response = await fetch(API_URL + ENDPOINTS.DEPARTAMENTOS.CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(departamento.toJson()),
      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return Departamento.fromJson(data);
    } catch (error) {
      console.error('Error creando departamento:', error);
      throw error;
    }
  }

  async editarDepartamento(id: number, departamento: Departamento): Promise<Departamento> {
    try {
      const response = await fetch(API_URL + ENDPOINTS.DEPARTAMENTOS.UPDATE + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(departamento.toJson()),
      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return Departamento.fromJson(data);
    } catch (error) {
      console.error('Error editando departamento:', error);
      throw error;
    }
  }

  async eliminarDepartamento(id: number): Promise<boolean> {
    try {
      const response = await fetch(API_URL + ENDPOINTS.DEPARTAMENTOS.DELETE + id, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      }
      return true;
    } catch (error) {
      console.error('Error eliminando departamento:', error);
      throw error;
    }
  }

  async getDepartamentos(): Promise<Departamento[]> {
    try {
      const response = await fetch(API_URL + ENDPOINTS.DEPARTAMENTOS.GET_ALL);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      }
      const data: any[] = await response.json();
      return data.map((item: any) => Departamento.fromJson(item));
    } catch (error) {
      console.error('Error obteniendo departamentos:', error);
      throw error;
    }
  }

  async getDepartamentoById(id: number): Promise<Departamento> {
    try {
      const response = await fetch(API_URL + ENDPOINTS.DEPARTAMENTOS.GET_BY_ID + id);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return Departamento.fromJson(data);
    } catch (error) {
      console.error('Error obteniendo departamento por ID:', error);
      throw error;
    }
  }
}