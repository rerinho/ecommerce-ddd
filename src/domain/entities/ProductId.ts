import { ValueObject } from "~/common/domain/ValueObject";
import { Guard } from "~/common/guard-clauses/GuardClauseBuilder";
import { UuidTool } from "~/common/tools/UuidTool";

interface ProductIdProps {
  value: string;
}

export class ProductId extends ValueObject<ProductIdProps> {
  static Create(id?: string) {
    if (id) {
      Guard.Argument(id, "productId").isValidUuid();
    }

    return new ProductId({ value: id || UuidTool.generate() });
  }

  get value(): string {
    return this.props.value;
  }
}
