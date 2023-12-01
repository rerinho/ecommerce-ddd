import { Guard } from "../../../common/guard-clauses/GuardClauseBuilder";
import { ValueObject } from "../../../common/domain/ValueObject";

interface QuantityProps {
  value: number;
}

export class Quantity extends ValueObject<QuantityProps> {
  static Create(quantity: number) {
    Guard.Argument(quantity, "quantity").isInteger().isPositive();

    return new Quantity({ value: quantity });
  }

  get value(): number {
    return this.props.value;
  }
}
