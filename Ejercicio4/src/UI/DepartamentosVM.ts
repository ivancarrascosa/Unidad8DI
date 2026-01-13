import { useState, useCallback } from 'react';
import { Departamento } from '../Domain/entities/Departamento';
import { IDepartamentoUseCase } from '../Domain/interfaces/IDepartamentoUseCase';
import { container } from '../DI/container';
import { TYPES } from '../DI/types';

// Singleton state holder
class DepartamentosState {
  private static instance: DepartamentosState;
  
  listaDepartamentos: Departamento[] = [];
  departamentoSeleccionado: Departamento | null = null;
  isLoading: boolean = false;
  error: string | null = null;
  
  private constructor() {}
  
  public static getInstance(): DepartamentosState {
    if (!DepartamentosState.instance) {
      DepartamentosState.instance = new DepartamentosState();
    }
    return DepartamentosState.instance;
  }
}

export interface DepartamentosVMState {
  listaDepartamentos: Departamento[];
  departamentoSeleccionado: Departamento | null;
  isLoading: boolean;
  error: string | null;
}

export interface DepartamentosVMActions {
  cargarDepartamentos: () => Promise<void>;
  seleccionarDepartamento: (departamento: Departamento | null) => void;
  guardarDepartamento: (departamento: Departamento) => Promise<boolean>;
  eliminarDepartamento: (id: number) => Promise<boolean>;
  limpiarError: () => void;
}

export const useDepartamentosVM = (): DepartamentosVMState & DepartamentosVMActions => {
  const useCase = container.get<IDepartamentoUseCase>(TYPES.IUseCaseDepartamentos);

  const [state, setState] = useState<DepartamentosVMState>({
    listaDepartamentos: DepartamentosState.getInstance().listaDepartamentos,
    departamentoSeleccionado: DepartamentosState.getInstance().departamentoSeleccionado,
    isLoading: false,
    error: null,
  });

  const updateState = useCallback((newState: Partial<DepartamentosVMState>) => {
    setState(prev => {
      const updated = { ...prev, ...newState };
      // Sincronizar con singleton
      const singleton = DepartamentosState.getInstance();
      if (newState.listaDepartamentos) singleton.listaDepartamentos = newState.listaDepartamentos;
      if (newState.departamentoSeleccionado !== undefined) singleton.departamentoSeleccionado = newState.departamentoSeleccionado;
      return updated;
    });
  }, []);

  const cargarDepartamentos = useCallback(async () => {
    updateState({ isLoading: true, error: null });
    try {
      const departamentos = await useCase.getDepartamentos();
      updateState({ listaDepartamentos: departamentos, isLoading: false });
    } catch (error: any) {
      updateState({ 
        error: error.message || 'Error al cargar departamentos', 
        isLoading: false 
      });
    }
  }, [useCase, updateState]);

  const seleccionarDepartamento = useCallback((departamento: Departamento | null) => {
    updateState({ departamentoSeleccionado: departamento });
  }, [updateState]);

  const guardarDepartamento = useCallback(async (departamento: Departamento): Promise<boolean> => {
    updateState({ isLoading: true, error: null });
    try {
      if (departamento.id === 0) {
        await useCase.crearDepartamento(departamento);
      } else {
        await useCase.editarDepartamento(departamento.id, departamento);
      }
      await cargarDepartamentos();
      return true;
    } catch (error: any) {
      updateState({ 
        error: error.message || 'Error al guardar departamento', 
        isLoading: false 
      });
      return false;
    }
  }, [useCase, cargarDepartamentos, updateState]);

  const eliminarDepartamento = useCallback(async (id: number): Promise<boolean> => {
    updateState({ isLoading: true, error: null });
    try {
      await useCase.eliminarDepartamento(id);
      await cargarDepartamentos();
      return true;
    } catch (error: any) {
      updateState({ 
        error: error.message || 'Error al eliminar departamento', 
        isLoading: false 
      });
      return false;
    }
  }, [useCase, cargarDepartamentos, updateState]);

  const limpiarError = useCallback(() => {
    updateState({ error: null });
  }, [updateState]);

  return {
    ...state,
    cargarDepartamentos,
    seleccionarDepartamento,
    guardarDepartamento,
    eliminarDepartamento,
    limpiarError,
  };
};