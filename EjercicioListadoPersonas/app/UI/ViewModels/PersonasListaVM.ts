import { TYPES } from "@/app/Core/types";
import { Persona } from "@/app/Domain/Entities/Persona";
import { IPersonasUseCase } from "@/app/Domain/Interfaces/IPersonasUseCase";
import { inject } from "inversify";
import {  makeAutoObservable } from "mobx";
export class PersonasListaVM {
    private _personasList: Persona[] = [];
    private _personaSeleccionada: Persona;

    constructor(
        @inject(TYPES.IPersonasUseCase)
        private UseCasePersonas: IPersonasUseCase
    ) {
        this._personasList = UseCasePersonas.getListaPersonas();
        this._personaSeleccionada = new Persona();
        makeAutoObservable(this);
    }

    public get personasList(): Persona[] {
        return this._personasList;
    }


    public get personaSeleccionada(): Persona {
        return this._personaSeleccionada;
    }


    public set personaSeleccionada(value: Persona) {
        this._personaSeleccionada = value;
        alert(`Persona seleccionada en el VM: ${this._personaSeleccionada.nombre} ${this._personaSeleccionada.apellido}`);
     
    }

}