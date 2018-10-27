export class Product {
  /*
  constructor(
    public key: string = '',
    public name: string = '',
    public description: string = '',
    public price: number = null,
    public active: boolean = false,
    public itemcount: number = null,
    public image: string = 'https://firebasestorage.googleapis.com/v0/b/mabrweb-e6503.appspot.com/o/mvi9oepg?alt=media&token=69801fdc-bbb0-4e19-84e3-e87b5615ca0b',
    public productCategory: string = '',
    public discount: boolean = false,
    public newProduct: boolean = false,
    public bestRated: boolean = false,
    public discountFactor: number = 1,
    public bestRatedNumber: number = null
  ) {}
  */
  key?: string;  // uuid in js
  name?: string;
  description?: string;
  price?: number;
  // picture?: string;
  createdDate?: string;
  active?: boolean;
  itemcount?: number;
  image?: string;
  productCategory?: string;
  discount?: boolean;
  newProduct?: boolean;
  bestRated?: boolean;
  discountFactor?: number;
  bestRatedNumber?: number;
}

