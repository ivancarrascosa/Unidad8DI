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
    const json: any = {
      nombre: this.nombre,
      apellido: this.apellido,
      fechaNac: this.fechaNac ? this.fechaNac.toISOString() : null,
      direccion: this.direccion,
      telefono: this.telefono,
      imagen: this.imagen,
      idDepartamento: this.idDepartamento,
    };
    // Solo incluir id si no es 0 (para edición)
    if (this.id !== 0) {
      json.id = this.id;
    }
    return json;
  }
}