export class Pokemon {
  constructor(
    private readonly _name: string,
    private readonly _url: string
  ) {}

  get name(): string {
    return this._name;
  }

  get url(): string {
    return this._url;
  }
}