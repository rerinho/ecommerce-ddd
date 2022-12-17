import { ProductId } from "./ProductId";
import { Price } from "./value-objects/Price";
import { Quantity } from "./value-objects/Quantity";

export interface CreateOrdemItemArgs {
  productId: ProductId;
  quantity: Quantity;
  price: Price;
}

export class OrderItem {
  private _quantity: Quantity;
  private _price: Price;
  private _productId: ProductId;

  constructor(args: CreateOrdemItemArgs) {
    this._productId = args.productId;
    this._quantity = args.quantity;
    this._price = args.price;
  }

  get productId(): ProductId {
    return this._productId;
  }

  get quantity(): number {
    return this._quantity.value;
  }

  get total(): number {
    return this._price.value * this._quantity.value;
  }
}
