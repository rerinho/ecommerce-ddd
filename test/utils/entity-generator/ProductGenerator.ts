import Product, { CreateProductArgs } from "~/domain/entities/Product";
import { Dimension } from "~/domain/entities/value-objects/Dimension";
import { Price } from "~/domain/entities/value-objects/Price";
import { Weight } from "~/domain/entities/value-objects/Weight";
import { generateProductId } from "../value-generator/ProductIdGenerator";

export const VALID_CREATE_PRODUCT_OPTIONS: CreateProductArgs = {
  id: generateProductId(),
  description: "Valid description",
  dimension: Dimension.Create({
    height: 1,
    width: 1,
    length: 1,
  }),
  price: Price.Create(50),
  weight: Weight.Create(1),
};

export function generateProduct(options?: Partial<CreateProductArgs>) {
  return new Product({ ...VALID_CREATE_PRODUCT_OPTIONS, ...options });
}
