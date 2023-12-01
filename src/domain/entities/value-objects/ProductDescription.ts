import { Guard } from "../../../shared/guard-clauses/GuardClauseBuilder";
import { ValueObject } from "../../../shared/domain/ValueObject";

interface ProductDescriptionProps {
  value: string;
}

export class ProductDescription extends ValueObject<ProductDescriptionProps> {
  static readonly DESCRIPTION_MIN_LENGTH = 1;

  static readonly DESCRIPTION_MAX_LENGTH = 20;
  static Create(description: string) {
    Guard.Argument(description, "description")
      .hasMinLength(ProductDescription.DESCRIPTION_MIN_LENGTH)
      .hasMaxLength(ProductDescription.DESCRIPTION_MAX_LENGTH);

    return new ProductDescription({ value: description });
  }

  get value(): string {
    return this.props.value;
  }
}
