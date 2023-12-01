import { ProductId } from "~/domain/entities/ProductId";
import { randomUUID } from "crypto";

export function makeProductId(id?: string) {
  return ProductId.Create(id || randomUUID());
}
