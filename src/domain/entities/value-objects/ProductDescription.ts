import { Guard } from "../../../shared/guard-clauses/GuardClauseBuilder";
import { ValueObject } from "../../../shared/domain/ValueObject";

interface ProductDescriptionProps {
  value: string;
}

export class ProductDescription extends ValueObject<ProductDescriptionProps> {
  static readonly DESCRIPTION_MIN_LENGTH = 1;
  
  static readonly DESCRIPTION_MAX_LENGTH = 20;
  static Create(description: string) {
    Guard.Create({ value: description, argumentName: "description" })
      .minLength(ProductDescription.DESCRIPTION_MIN_LENGTH)
      .maxLength(ProductDescription.DESCRIPTION_MAX_LENGTH)
      .validate();

    return new ProductDescription({ value: description });
  }

  get value(): string {
    return this.props.value;
  }
}
