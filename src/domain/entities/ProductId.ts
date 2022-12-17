import { ValueObject } from "~/shared/domain/ValueObject";
import { Guard } from "~/shared/guard-clauses/GuardClauseBuilder";

interface ProductIdProps {
  value: string;
}

export class ProductId extends ValueObject<ProductIdProps> {
  static Create(id: string) {
    Guard.Create({ argumentName: "productId", value: id })
      .isValidUuid()
      .validate();

    return new ProductId({ value: id });
  }

  get value(): string {
    return this.props.value;
  }
}
