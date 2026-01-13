export class Departamento {
  id: number;
  nombre: string;

  constructor(id: number, nombre: string) {
    this.id = id;
    this.nombre = nombre;
  }

  static fromJson(json: any): Departamento {
    return new Departamento(json.id, json.nombre);
  }

  toJson(): object {
    return {
      id: this.id,
      nombre: this.nombre,
    };
  }
}