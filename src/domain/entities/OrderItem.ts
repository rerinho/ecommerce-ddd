import Product from "./Product";
import { Quantity } from "./value-objects/Quantity";

export class OrderItem {
  private _quantity: Quantity;
  private product: Product;

  constructor(product: Product, quantity: number) {
    this.product = product;
    this._quantity = Quantity.Create(quantity);
  }

  get quantity(): number {
    return this._quantity.value;
  }

  get total(): number {
    return this.product.price * this.quantity;
  }
}
