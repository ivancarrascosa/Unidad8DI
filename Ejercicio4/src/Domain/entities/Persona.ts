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
      json.apellidos,          // API usa "Apellidos"
      json.fechaNacimiento ? new Date(json.fechaNacimiento) : null,  // API usa "FechaNacimiento"
      json.direccion,
      json.telefono,
      json.foto,               // API usa "Foto"
      json.idDepartamento
    );
  }

  toJson(): object {
    return {
      id: this.id,
      nombre: this.nombre,
      apellidos: this.apellido,           // API espera "Apellidos"
      fechaNacimiento: this.fechaNac,     // API espera "FechaNacimiento"
      direccion: this.direccion,
      telefono: this.telefono,
      foto: this.imagen,                  // API espera "Foto"
      idDepartamento: this.idDepartamento,
    };
  }
}