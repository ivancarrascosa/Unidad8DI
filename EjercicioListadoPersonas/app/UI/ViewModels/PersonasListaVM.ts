import { TYPES } from "@/app/Core/types";
import { Persona } from "@/app/Domain/Entities/Persona";
import { IPersonasUseCase } from "@/app/Domain/Interfaces/IPersonasUseCase";
import { inject, injectable } from "inversify";
import { makeAutoObservable, runInAction } from "mobx";

@injectable()
export class PersonasListaVM {
    private _personasList: Persona[] = [];
    private _personaSeleccionada: Persona;
    private _isLoading: boolean = false;
    private _error: string | null = null;

    constructor(
        @inject(TYPES.IPersonasUseCase)
        private UseCasePersonas: IPersonasUseCase
    ) {
        this._personaSeleccionada = new Persona();
        makeAutoObservable(this);
        // Cargar datos al inicializar
        this.cargarPersonas();
    }

    // Método para cargar personas desde la API
    async cargarPersonas() {
        this._isLoading = true;
        this._error = null;
        
        try {
            const personas = await this.UseCasePersonas.getListaPersonas();
            
            // runInAction para actualizar el estado observable después de la operación async
            runInAction(() => {
                this._personasList = personas;
                this._isLoading = false;
            });
        } catch (error) {
            runInAction(() => {
                this._error = error instanceof Error ? error.message : "Error al cargar personas";
                this._isLoading = false;
            });
            console.error("Error cargando personas:", error);
        }
    }

    // Getters
    public get personasList(): Persona[] {
        return this._personasList;
    }

    public get personaSeleccionada(): Persona {
        return this._personaSeleccionada;
    }

    public get isLoading(): boolean {
        return this._isLoading;
    }

    public get error(): string | null {
        return this._error;
    }

    // Setter
    public set personaSeleccionada(value: Persona) {
        this._personaSeleccionada = value;
        alert(`Persona seleccionada en el VM: ${this._personaSeleccionada.nombre} ${this._personaSeleccionada.apellido}`);
    }

    // Método para recargar datos (útil para pull-to-refresh)
    async recargarPersonas() {
        await this.cargarPersonas();
    }
}