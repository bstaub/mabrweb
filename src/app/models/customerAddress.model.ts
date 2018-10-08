export class CustomerAddress {
  constructor(
    public firstname: string = '',
    public lastname: string = '',
    public address: string = '',
    public zip: number = null,
    public city: string = '',
    public country: string = '',
    public mail: string = '',
    public phone: string = ''
  ) {}
}
