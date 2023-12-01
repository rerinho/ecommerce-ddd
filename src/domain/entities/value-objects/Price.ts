import { Guard } from "../../../common/guard-clauses/GuardClauseBuilder";
import { ValueObject } from "../../../common/domain/ValueObject";

interface PriceProps {
  value: number;
}

export class Price extends ValueObject<PriceProps> {
  static Create(price: number) {
    Guard.Argument(price, "price").isPositive();

    return new Price({ value: price });
  }

  get value(): number {
    return this.props.value;
  }
}
