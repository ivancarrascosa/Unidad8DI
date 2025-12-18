export class Pokemon {
  constructor(
    private readonly _name: string,
    private readonly _url: string,
  ) {}

  get name(): string {
    return this._name;
  }

  get url(): string {
    return this._url;
  }

  getId(): number {
  const parts = this.url.split('/').filter(Boolean);
  return Number(parts[parts.length - 1]);
}
}