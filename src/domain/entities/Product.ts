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
  private _dimension: Dimension;
  private _weight: Weight;

  constructor({
    id,
    description,
    dimension,
    price,
    weight,
  }: CreateProductOptions) {
    this._id = id;
    this._description = ProductDescription.Create(description);
    this._price = price;
    this._weight = weight;
    this._dimension = dimension;
  }

  get id(): ProductId {
    return this._id;
  }

  get price(): Price {
    return this._price;
  }

  get dimension(): Dimension {
    return this._dimension;
  }

  get description(): string {
    return this._description.value;
  }

  get weight(): Weight {
    return this._weight;
  }

  get volume(): number {
    return this._dimension.volume;
  }
}
