export class Persona{
  id: number;
  nombre: string;
  apellido: string;
  fechaNac: Date | null;
  direccion: string;
  telefono: string;
  imagen: string;
  idDepartamento: number;

  constructor(
    id: number,
    nombre: string,
    apellido: string,
    fechaNac: Date | null,
    direccion: string,
    telefono: string,
    imagen: string,
    idDepartamento: number
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.fechaNac = fechaNac;
    this.direccion = direccion;
    this.telefono = telefono;
    this.imagen = imagen;
    this.idDepartamento = idDepartamento;
  }

  static fromJson(json: any): Persona {
    return new Persona(
      json.id,
      json.nombre,
      json.apellido,           // API usa "apellido"
      json.fechaNac ? new Date(json.fechaNac) : null,  // API usa "fechaNac"
      json.direccion,
      json.telefono,
      json.imagen,             // API usa "imagen"
      json.idDepartamento
    );
  }

  toJson(): object {
    return {
      id: this.id,
      nombre: this.nombre,
      apellido: this.apellido,            // API espera "apellido"
      fechaNac: this.fechaNac,            // API espera "fechaNac"
      direccion: this.direccion,
      telefono: this.telefono,
      imagen: this.imagen,                // API espera "imagen"
      idDepartamento: this.idDepartamento,
    };
  }
}