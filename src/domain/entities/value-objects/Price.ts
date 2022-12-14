import { Guard } from "../../../shared/guard-clauses/GuardClauseBuilder";
import { ValueObject } from "../../../shared/domain/ValueObject";

interface PriceProps {
  value: number;
}

export class Price extends ValueObject<PriceProps> {
  static Create(price: number) {
    Guard.Create({ value: price, argumentName: "price" })
      .isPositive()
      .validate();

    return new Price({ value: price });
  }

  get value(): number {
    return this.props.value;
  }
}
