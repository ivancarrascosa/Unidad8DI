import { injectable, inject } from 'inversify';
import { Persona } from '../entities/Persona';
import { IPersonaUseCase } from '../interfaces/IPersonaUseCase';
import { IPersonaRepository } from '../repositories/IPersonaRepository';
import { TYPES } from '../../DI/types';

@injectable()
export class DefaultPersonasUseCase implements IPersonaUseCase {
  private repository: IPersonaRepository;

  constructor(@inject(TYPES.IRepositoryPersonas) repository: IPersonaRepository) {
    this.repository = repository;
  }

  async crearPersona(persona: Persona): Promise<Persona> {
    return this.repository.crearPersona(persona);
  }

  async editarPersona(id: number, persona: Persona): Promise<Persona> {
    return this.repository.editarPersona(id, persona);
  }

  async eliminarPersona(id: number): Promise<boolean> {
    if (this.checkDomingo()) {
        // Retornamos un Promise resuelto con 'false' (o true según tu lógica)
        return false;
    } else {
        // Esperamos la promesa de eliminarPersona del repositorio
        return await this.repository.eliminarPersona(id);
    }
}

  async getPersonas(): Promise<Persona[]> {
    // Obtenemos la lista real de personas
    const listaPersonas: Persona[] = await this.repository.getPersonas();

    if (this.checkDay()) {
        // Recorremos la lista de atrás hacia adelante para poder eliminar elementos sin romper el índice
        for (let i = listaPersonas.length - 1; i >= 0; i--) {
            const persona = listaPersonas[i];

            // Verificamos que fechaNac exista antes de calcular edad
            if (!persona.fechaNac || !this.esMayorDeEdad(new Date(persona.fechaNac))) {
                listaPersonas.splice(i, 1); // eliminamos del array original
            }
        }
    }

    return listaPersonas;
}

  async getPersonaById(id: number): Promise<Persona> {
    return this.repository.getPersonaById(id);
  }

  private checkDay(): Boolean {
    const fechaActual = new Date();
    return [5,6].includes(fechaActual.getDay());
  }

  private checkDomingo(): Boolean {
    const fechaActual = new Date();
    return fechaActual.getDay() == 0;
  }

  private esMayorDeEdad(fecha: Date): boolean {
    const hoy = new Date();
    let edad = hoy.getFullYear() - fecha.getFullYear();
    const mesDiferencia = hoy.getMonth() - fecha.getMonth();
    const diaDiferencia = hoy.getDate() - fecha.getDate();

    // Si no ha llegado su cumpleaños este año, restamos 1
    if (mesDiferencia < 0 || (mesDiferencia === 0 && diaDiferencia < 0)) {
        edad--;
    }

    return edad >= 18;
}
}