import { ProductId } from "./ProductId";
import { Price } from "./value-objects/Price";
import { Quantity } from "./value-objects/Quantity";

export interface CreateOrdemItemOptions {
  productId: ProductId;
  quantity: Quantity;
  price: Price;
}

export class OrderItem {
  private _quantity: Quantity;
  private _price: Price;
  private _productId: ProductId;

  constructor(options: CreateOrdemItemOptions) {
    this._productId = options.productId;
    this._quantity = options.quantity;
    this._price = options.price;
  }

  get quantity(): number {
    return this._quantity.value;
  }

  get total(): number {
    return this._price.value * this._quantity.value;
  }
}
