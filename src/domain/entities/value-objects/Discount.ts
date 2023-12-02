import { Guard } from "../../../common/guard-clauses/GuardClauseBuilder";
import { ValueObject } from "../../../common/domain/ValueObject";

interface DiscountProps {
  value: number;
}

export class Discount extends ValueObject<DiscountProps> {
  static Create(value: number) {
    Guard.Argument(value, "value").isPositive().isLessThanOrEqualTo(1);

    return new Discount({ value });
  }

  get value(): number {
    return this.props.value;
  }
}
