import { Guard } from "../../core/guard-clauses/GuardClauseBuilder";
import { ValueObject } from "../../core/ValueObject";

interface QuantityProps {
  value: number;
}

export class Quantity extends ValueObject<QuantityProps> {
  static Create(quantity: number) {
    Guard.Create({ value: quantity, argumentName: "quantity" })
      .isPositive()
      .validate();

    return new Quantity({ value: quantity });
  }

  get value(): number {
    return this.props.value;
  }
}
