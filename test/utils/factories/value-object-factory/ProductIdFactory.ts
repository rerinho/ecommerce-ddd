import { ProductId } from "~/domain/entities/ProductId";
import { UuidTool } from "~/shared/tools/UuidTool";

export function makeProductId(id?: string) {
  return ProductId.Create(id || UuidTool.generate());
}
