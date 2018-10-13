export class ProductPerOrderLocalStorage {
  constructor(
    public productId: string = '',
    public qty: number = null,
    public name: string = '',
    public description: string = '',
    public image: string = 'https://firebasestorage.googleapis.com/v0/b/mabrweb-e6503.appspot.com/o/mvi9oepg?alt=media&token=69801fdc-bbb0-4e19-84e3-e87b5615ca0b',
    public price: number = null,
    //  public discountFactor: number = 1
  ) {}
}
