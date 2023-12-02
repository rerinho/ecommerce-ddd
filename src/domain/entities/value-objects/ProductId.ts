import { ValueObject } from "~/common/domain/ValueObject";
import { Guard } from "~/common/guard-clauses/GuardClauseBuilder";
import { randomUUID } from "crypto";

interface ProductIdProps {
  value: string;
}

export class ProductId extends ValueObject<ProductIdProps> {
  static Create(id?: string) {
    if (id) {
      Guard.Argument(id, "productId").isValidUuid();
    }

    return new ProductId({ value: id || randomUUID() });
  }

  get value(): string {
    return this.props.value;
  }
}
