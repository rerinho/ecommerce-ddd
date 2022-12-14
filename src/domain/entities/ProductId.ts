import { ValueObject } from "~/shared/domain/ValueObject";
import { Guard } from "~/shared/guard-clauses/GuardClauseBuilder";
import { UuidTool } from "~/shared/tools/UuidTool";

interface ProductIdProps {
  value: string;
}

export class ProductId extends ValueObject<ProductIdProps> {
  static Create(id?: string) {
    if (id) {
      Guard.Create({ argumentName: "productId", value: id })
        .isValidUuid()
        .validate();
    }

    return new ProductId({ value: id || UuidTool.generate() });
  }

  get value(): string {
    return this.props.value;
  }
}
