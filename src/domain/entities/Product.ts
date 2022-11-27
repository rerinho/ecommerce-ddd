import { Price } from "./value-objects/Price";
import { ProductDescription } from "./value-objects/ProductDescription";
import { Dimensions } from "./value-objects/Dimensions";

interface CreateProductOptions {
  description: string;
  price: number;
  dimensions: Dimensions;
}

export default class Product {
  private readonly _price: Price;
  private readonly _description: ProductDescription;
  private readonly _dimension: Dimensions;

  constructor({
    description,
    dimensions: dimension,
    price,
  }: CreateProductOptions) {
    this._description = ProductDescription.Create(description);
    this._price = Price.Create(price);
    this._dimension = dimension;
  }

  get price(): number {
    return this._price.value;
  }

  get description(): string {
    return this._description.value;
  }

  get volume(): number {
    return (
      this._dimension.height * this._dimension.width * this._dimension.length
    );
  }
}
