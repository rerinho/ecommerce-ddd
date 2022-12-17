import Product, { CreateProductArgs } from "~/domain/entities/Product";
import { Dimension } from "~/domain/entities/value-objects/Dimension";
import { Price } from "~/domain/entities/value-objects/Price";
import { ProductDescription } from "~/domain/entities/value-objects/ProductDescription";
import { Weight } from "~/domain/entities/value-objects/Weight";
import { makeProductId } from "../value-object-factory/ProductIdFactory";

export const VALID_CREATE_PRODUCT_ARGS: CreateProductArgs = {
  id: makeProductId(),
  description: ProductDescription.Create("Valid description"),
  dimension: Dimension.Create({
    height: 1,
    width: 1,
    length: 1,
  }),
  price: Price.Create(50),
  weight: Weight.Create(1),
};

export function makeProduct(options?: Partial<CreateProductArgs>) {
  return new Product({ ...VALID_CREATE_PRODUCT_ARGS, ...options });
}
