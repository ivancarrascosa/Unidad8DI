export class Persona {
  private _id: number;
  private _nombre: string;
  private _apellido: string;
  private _fechaNac: Date;
  private _direccion: string;
  private _telefono: string;
  private _imagen: string;
  private _idDepartamento: number;

  // Getters y Setters
  public get id(): number {
    return this._id;
  }

  public get nombre(): string {
    return this._nombre;
  }
  public set nombre(value: string) {
    this._nombre = value;
  }

  public get apellido(): string {
    return this._apellido;
  }
  public set apellido(value: string) {
    this._apellido = value;
  }

  public get fechaNac(): Date {
    return this._fechaNac;
  }
  public set fechaNac(value: Date) {
    this._fechaNac = value;
  }

  public get direccion(): string {
    return this._direccion;
  }
  public set direccion(value: string) {
    this._direccion = value;
  }

  public get telefono(): string {
    return this._telefono;
  }
  public set telefono(value: string) {
    this._telefono = value;
  }

  public get imagen(): string {
    return this._imagen;
  }
  public set imagen(value: string) {
    this._imagen = value;
  }

  public get idDepartamento(): number {
    return this._idDepartamento;
  }
  public set idDepartamento(value: number) {
    this._idDepartamento = value;
  }
  
  constructor(
    id?: number,
    nombre?: string,
    apellido?: string,
    fechaNac?: Date,
    direccion?: string,
    telefono?: string,
    imagen?: string,
    idDepartamento?: number
  ) {
    this._id = id ?? 0;
    this._nombre = nombre ?? "";
    this._apellido = apellido ?? "";
    this._fechaNac = fechaNac ?? new Date();
    this._direccion = direccion ?? "";
    this._telefono = telefono ?? "";
    this._imagen = imagen ?? "";
    this._idDepartamento = idDepartamento ?? 0;
  }
  
}
