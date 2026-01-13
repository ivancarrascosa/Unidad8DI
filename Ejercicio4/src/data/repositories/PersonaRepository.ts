import { injectable } from 'inversify';
import { Persona } from '../../Domain/entities/Persona';
import { IPersonaRepository } from '../../Domain/repositories/IPersonaRepository';
import { API_URL, ENDPOINTS } from '../services/APIConnection';

@injectable()
export class PersonaRepository implements IPersonaRepository {
  constructor() {}

  async crearPersona(persona: Persona): Promise<Persona> {
    try {
      const response = await fetch(API_URL + ENDPOINTS.PERSONAS.CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(persona.toJson()),
      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return Persona.fromJson(data);
    } catch (error) {
      console.error('Error creando persona:', error);
      throw error;
    }
  }

  async editarPersona(id: number, persona: Persona): Promise<Persona> {
    try {
      const response = await fetch(API_URL + ENDPOINTS.PERSONAS.UPDATE + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(persona.toJson()),
      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return Persona.fromJson(data);
    } catch (error) {
      console.error('Error editando persona:', error);
      throw error;
    }
  }

  async eliminarPersona(id: number): Promise<boolean> {
    try {
      const response = await fetch(API_URL + ENDPOINTS.PERSONAS.DELETE + id, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      }
      return true;
    } catch (error) {
      console.error('Error eliminando persona:', error);
      throw error;
    }
  }

  async getPersonas(): Promise<Persona[]> {
    try {
      const response = await fetch(API_URL + ENDPOINTS.PERSONAS.GET_ALL);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      }
      const data: any[] = await response.json();
      return data.map((item: any) => Persona.fromJson(item));
    } catch (error) {
      console.error('Error obteniendo personas:', error);
      throw error;
    }
  }

  async getPersonaById(id: number): Promise<Persona> {
    try {
      const response = await fetch(API_URL + ENDPOINTS.PERSONAS.GET_BY_ID + id);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return Persona.fromJson(data);
    } catch (error) {
      console.error('Error obteniendo persona por ID:', error);
      throw error;
    }
  }
}