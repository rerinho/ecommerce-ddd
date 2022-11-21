import { Price } from "./value-objects/Price";
import { ProductDescription } from "./value-objects/ProductDescription";

export default class Product {
  private readonly _price: Price;
  private readonly _description: ProductDescription;

  constructor(description: string, price: number) {
    this._description = ProductDescription.Create(description);
    this._price = Price.Create(price);
  }

  get price(): number {
    return this._price.value;
  }

  get description(): string {
    return this._description.value;
  }
}
