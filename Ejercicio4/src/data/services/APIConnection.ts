// TODO: Configura tu BASE_URL aquí
export const API_URL = 'https://ui20251201140330-ahdqhwe3c6cxcrfk.italynorth-01.azurewebsites.net/api/';

// ============================================================
// ENDPOINTS - Basados en DepartamentoApiController y PersonasApiController
// ============================================================

export const ENDPOINTS = {
  // Personas - PersonasApiController
  PERSONAS: {
    GET_ALL: 'PersonasApi',                    // GET    - Obtener todas las personas
    GET_BY_ID: 'PersonasApi/',                 // GET    - {id} Obtener persona por ID
    CREATE: 'PersonasApi',                     // POST   - Crear nueva persona
    UPDATE: 'PersonasApi/',                    // PUT    - {id} Actualizar persona (si id=0 crea)
    DELETE: 'PersonasApi/',                    // DELETE - {id} Eliminar persona
  },
  
  // Departamentos - DepartamentoApiController
  DEPARTAMENTOS: {
    GET_ALL: 'DepartamentoApi',                // GET    - Obtener todos los departamentos
    GET_BY_ID: 'DepartamentoApi/',             // GET    - {id} Obtener departamento por ID
    CREATE: 'DepartamentoApi',                 // POST   - Crear nuevo departamento
    UPDATE: 'DepartamentoApi/',                // PUT    - {id} Actualizar departamento (si id=0 crea)
    DELETE: 'DepartamentoApi/',                // DELETE - {id} Eliminar departamento
  },
};