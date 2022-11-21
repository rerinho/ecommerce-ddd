import { Guard } from "../../core/guard-clauses/GuardClauseBuilder";
import { ValueObject } from "../../core/ValueObject";

export enum DiscountType {
  Nominal = "NOMINAL",
  Percentage = "Percentage",
}

interface DiscountProps {
  value: number;
  type: DiscountType;
}

export class Discount extends ValueObject<DiscountProps> {
  static Create(value: number, type: DiscountType) {
    Guard.Create({ value: value, argumentName: "value" })
      .isPositive()
      .validate();

    return new Discount({ value, type });
  }

  get value(): DiscountProps {
    return this.props;
  }
}
