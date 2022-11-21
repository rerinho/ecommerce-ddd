import { Guard } from "../../core/guard-clauses/GuardClauseBuilder";
import { ValueObject } from "../../core/ValueObject";

interface ProductDescriptionProps {
  value: string;
}

const DESCRIPTION_MAX_LENGTH = 30;
const DESCRIPTION_MIN_LENGTH = 1;

export class ProductDescription extends ValueObject<ProductDescriptionProps> {
  static Create(description: string) {
    Guard.Create({ value: description, argumentName: "description" })
      .minLength(DESCRIPTION_MIN_LENGTH)
      .maxLength(DESCRIPTION_MAX_LENGTH)
      .validate();

    return new ProductDescription({ value: description });
  }

  get value(): string {
    return this.props.value;
  }
}
