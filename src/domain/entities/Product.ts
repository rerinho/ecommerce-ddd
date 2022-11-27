import { Price } from "./value-objects/Price";
import { ProductDescription } from "./value-objects/ProductDescription";
import { Dimensions } from "./value-objects/Dimensions";
import { Weight } from "./value-objects/Weight";

export interface CreateProductOptions {
  description: string;
  price: number;
  dimensions: Dimensions;
  weight: number;
}

export default class Product {
  private _price: Price;
  private _description: ProductDescription;
  private _dimensions: Dimensions;
  private _weight: Weight;

  constructor({
    description,
    dimensions,
    price,
    weight,
  }: CreateProductOptions) {
    this._description = ProductDescription.Create(description);
    this._price = Price.Create(price);
    this._weight = Weight.Create(weight);
    this._dimensions = dimensions;
  }

  get price(): number {
    return this._price.value;
  }

  get description(): string {
    return this._description.value;
  }

  get weight(): number {
    return this._weight.value;
  }

  get volume(): number {
    return (
      this._dimensions.height * this._dimensions.width * this._dimensions.length
    );
  }
}
