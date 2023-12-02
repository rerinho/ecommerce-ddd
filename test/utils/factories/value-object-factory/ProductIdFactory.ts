import { ProductId } from "~/domain/entities/value-objects/ProductId";
import { randomUUID } from "crypto";

export function makeProductId(id?: string) {
  return ProductId.Create(id || randomUUID());
}
