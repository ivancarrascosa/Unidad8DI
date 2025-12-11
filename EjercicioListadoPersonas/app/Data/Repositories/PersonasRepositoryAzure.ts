import { Persona } from "@/app/Domain/Entities/Persona";
import { IRepositoryPersonas } from "@/app/Domain/Repositories/IRepositoryPersonas";
import { injectable } from "inversify";

@injectable()
export class PersonasRepositoryAzure implements IRepositoryPersonas {
    API_URL = "https://ui20251201140330-ahdqhwe3c6cxcrfk.italynorth-01.azurewebsites.net/API/"
    
    async getListadoCompletoPersonas(): Promise<Persona[]> {
        try {
            const response = await fetch(this.API_URL + "PersonasApi");

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
            }

            const data: any[] = await response.json();

            // Mapear los datos de la API a instancias de Persona
            return data.map((item: any) => new Persona(
                item.id,
                item.nombre,
                item.apellido,
                new Date(item.fechaNac),
                item.direccion,
                item.telefono,
                item.imagen,
                item.idDepartamento
            ));

        } catch (error) {
            console.error("Error al obtener personas:", error);
            throw error; // Re-lanzar el error para que el ViewModel lo maneje
        }
    }
}