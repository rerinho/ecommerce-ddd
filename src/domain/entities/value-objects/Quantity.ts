import { Guard } from "../../../shared/guard-clauses/GuardClauseBuilder";
import { ValueObject } from "../../../shared/domain/ValueObject";

interface QuantityProps {
  value: number;
}

export class Quantity extends ValueObject<QuantityProps> {
  static Create(quantity: number) {
    Guard.Create({ value: quantity, argumentName: "quantity" })
      .isInteger()
      .isPositive()
      .validate();

    return new Quantity({ value: quantity });
  }

  get value(): number {
    return this.props.value;
  }
}
