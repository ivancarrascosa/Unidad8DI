import { useState, useCallback } from 'react';
import { Persona } from '../Domain/entities/Persona';
import { Departamento } from '../Domain/entities/Departamento';
import { DefaultPersonasUseCase } from '../Domain/useCases/DefaultPersonasUseCase';
import { DefaultDepartamentosUseCase } from '../Domain/useCases/DefaultDepartamentosUseCase';
import { PersonaRepository } from '../data/repositories/PersonaRepository';
import { DepartamentoRepository } from '../data/repositories/DepartamentoRepository';

// Singleton state holder
class PersonasState {
  private static instance: PersonasState;
  
  listaPersonas: Persona[] = [];
  personaSeleccionada: Persona | null = null;
  listaDepartamentos: Departamento[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  
  private constructor() {}
  
  public static getInstance(): PersonasState {
    if (!PersonasState.instance) {
      PersonasState.instance = new PersonasState();
    }
    return PersonasState.instance;
  }
}

export interface PersonasVMState {
  listaPersonas: Persona[];
  personaSeleccionada: Persona | null;
  listaDepartamentos: Departamento[];
  isLoading: boolean;
  error: string | null;
}

export interface PersonasVMActions {
  cargarPersonas: () => Promise<void>;
  cargarDepartamentos: () => Promise<void>;
  seleccionarPersona: (persona: Persona | null) => void;
  guardarPersona: (persona: Persona) => Promise<boolean>;
  eliminarPersona: (id: number) => Promise<boolean>;
  limpiarError: () => void;
}

export const usePersonasVM = (): PersonasVMState & PersonasVMActions => {
  const personaRepository = PersonaRepository.getInstance();
  const departamentoRepository = DepartamentoRepository.getInstance();
  const personaUseCase = new DefaultPersonasUseCase(personaRepository);
  const departamentoUseCase = new DefaultDepartamentosUseCase(departamentoRepository);

  const [state, setState] = useState<PersonasVMState>({
    listaPersonas: PersonasState.getInstance().listaPersonas,
    personaSeleccionada: PersonasState.getInstance().personaSeleccionada,
    listaDepartamentos: PersonasState.getInstance().listaDepartamentos,
    isLoading: false,
    error: null,
  });

  const updateState = useCallback((newState: Partial<PersonasVMState>) => {
    setState(prev => {
      const updated = { ...prev, ...newState };
      // Sincronizar con singleton
      const singleton = PersonasState.getInstance();
      if (newState.listaPersonas) singleton.listaPersonas = newState.listaPersonas;
      if (newState.personaSeleccionada !== undefined) singleton.personaSeleccionada = newState.personaSeleccionada;
      if (newState.listaDepartamentos) singleton.listaDepartamentos = newState.listaDepartamentos;
      return updated;
    });
  }, []);

  const cargarPersonas = useCallback(async () => {
    updateState({ isLoading: true, error: null });
    try {
      const personas = await personaUseCase.getPersonas();
      updateState({ listaPersonas: personas, isLoading: false });
    } catch (error: any) {
      updateState({ 
        error: error.message || 'Error al cargar personas', 
        isLoading: false 
      });
    }
  }, [personaUseCase, updateState]);

  const cargarDepartamentos = useCallback(async () => {
    try {
      const departamentos = await departamentoUseCase.getDepartamentos();
      updateState({ listaDepartamentos: departamentos });
    } catch (error: any) {
      console.error('Error cargando departamentos:', error);
    }
  }, [departamentoUseCase, updateState]);

  const seleccionarPersona = useCallback((persona: Persona | null) => {
    updateState({ personaSeleccionada: persona });
  }, [updateState]);

  const guardarPersona = useCallback(async (persona: Persona): Promise<boolean> => {
    updateState({ isLoading: true, error: null });
    try {
      if (persona.id === 0) {
        await personaUseCase.crearPersona(persona);
      } else {
        await personaUseCase.editarPersona(persona.id, persona);
      }
      await cargarPersonas();
      return true;
    } catch (error: any) {
      updateState({ 
        error: error.message || 'Error al guardar persona', 
        isLoading: false 
      });
      return false;
    }
  }, [personaUseCase, cargarPersonas, updateState]);

  const eliminarPersona = useCallback(async (id: number): Promise<boolean> => {
    updateState({ isLoading: true, error: null });
    try {
      await personaUseCase.eliminarPersona(id);
      await cargarPersonas();
      return true;
    } catch (error: any) {
      updateState({ 
        error: error.message || 'Error al eliminar persona', 
        isLoading: false 
      });
      return false;
    }
  }, [personaUseCase, cargarPersonas, updateState]);

  const limpiarError = useCallback(() => {
    updateState({ error: null });
  }, [updateState]);

  return {
    ...state,
    cargarPersonas,
    cargarDepartamentos,
    seleccionarPersona,
    guardarPersona,
    eliminarPersona,
    limpiarError,
  };
};