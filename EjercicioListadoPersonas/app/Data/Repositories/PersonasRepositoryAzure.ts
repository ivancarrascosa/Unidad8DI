import { Persona } from "@/app/Domain/Entities/Persona";
import { IRepositoryPersonas } from "@/app/Domain/Repositories/IRepositoryPersonas";
import { injectable } from "inversify";

@injectable()
class PersonasRepositoryAzure implements IRepositoryPersonas {
    API_URL = "https://ui20251201140330-ahdqhwe3c6cxcrfk.italynorth-01.azurewebsites.net/API/"
    async getListadoCompletoPersonas(): Promise<Persona[]> {
        try {
            const response = await fetch(this.API_URL + "PersonasApi")

            if (response.ok) {
                const data: Persona[] = await response.json();

                return data
            } else {
                throw new Error("Error HTTP: " + response.status + " " + response.statusText);
            }

        }
        catch(error) {
            console.error("Error al obtener personas:", error);

            return [];
            }
    }
    
}