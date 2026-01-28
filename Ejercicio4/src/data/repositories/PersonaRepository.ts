import { injectable } from 'inversify';
import { Persona } from '../../Domain/entities/Persona';
import { IPersonaRepository } from '../../Domain/repositories/IPersonaRepository';
import { API_URL, ENDPOINTS } from '../services/APIConnection';

@injectable()
export class PersonaRepository implements IPersonaRepository {
  constructor() {}

  async crearPersona(persona: Persona): Promise<Persona> {
    try {
      const url = API_URL + ENDPOINTS.PERSONAS.CREATE;
      const body = JSON.stringify(persona.toJson());

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });

      const responseText = await response.text();

      if (response.status === 204) {
        throw new Error('No se pudo crear la persona en la base de datos');
      }

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} - ${responseText}`);
      }

      const data = responseText ? JSON.parse(responseText) : {};
      return Persona.fromJson(data);
    } catch (error) {
      throw error;
    }
  }

  async editarPersona(id: number, persona: Persona): Promise<Persona> {
    try {
      const url = API_URL + ENDPOINTS.PERSONAS.UPDATE + id;
      const body = JSON.stringify(persona.toJson());

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });

      const responseText = await response.text();

      if (response.status === 204) {
        throw new Error('No se pudo actualizar la persona en la base de datos');
      }

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} - ${responseText}`);
      }

      const data = responseText ? JSON.parse(responseText) : {};
      return Persona.fromJson(data);
    } catch (error) {
      throw error;
    }
  }

  async eliminarPersona(id: number): Promise<boolean> {
    try {
      const url = API_URL + ENDPOINTS.PERSONAS.DELETE + id;

      const response = await fetch(url, {
        method: 'DELETE',
      });

      if (response.status === 204) {
        throw new Error('No se pudo eliminar la persona de la base de datos');
      }

      if (!response.ok) {
        const responseText = await response.text();
        throw new Error(`Error HTTP: ${response.status} - ${responseText}`);
      }
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getPersonas(): Promise<Persona[]> {
    try {
      const url = API_URL + ENDPOINTS.PERSONAS.GET_ALL;
      const response = await fetch(url);

      if (response.status === 204) {
        return [];
      }

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      }

      const data: any[] = await response.json();
      return data.map((item: any) => Persona.fromJson(item));
    } catch (error) {
      throw error;
    }
  }

  async getPersonaById(id: number): Promise<Persona> {
    try {
      const response = await fetch(API_URL + ENDPOINTS.PERSONAS.GET_BY_ID + id);

      if (response.status === 204) {
        throw new Error('Persona no encontrada');
      }

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return Persona.fromJson(data);
    } catch (error) {
      throw error;
    }
  }
}
