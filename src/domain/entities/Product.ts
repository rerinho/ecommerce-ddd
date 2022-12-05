import { Price } from "./value-objects/Price";
import { ProductDescription } from "./value-objects/ProductDescription";
import { Dimension } from "./value-objects/Dimension";
import { Weight } from "./value-objects/Weight";
import { ProductId } from "./ProductId";

export interface CreateProductOptions {
  id: ProductId;
  description: string;
  price: Price;
  dimension: Dimension;
  weight: Weight;
}

export default class Product {
  private _id: ProductId;
  private _price: Price;
  private _description: ProductDescription;
  private _dimensions: Dimension;
  private _weight: Weight;

  constructor({
    id,
    description,
    dimension: dimensions,
    price,
    weight,
  }: CreateProductOptions) {
    this._id = id;
    this._description = ProductDescription.Create(description);
    this._price = price;
    this._weight = weight;
    this._dimensions = dimensions;
  }

  get id(): ProductId {
    return this._id;
  }

  get price(): Price {
    return this._price;
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
