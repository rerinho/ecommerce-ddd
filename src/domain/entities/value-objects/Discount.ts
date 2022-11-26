import { Guard } from "../../../shared/guard-clauses/GuardClauseBuilder";
import { ValueObject } from "../../../shared/domain/ValueObject";

export enum DiscountType {
  Nominal = "NOMINAL",
  Percentage = "PERCENTAGE",
}

interface DiscountProps {
  value: number;
  type: DiscountType;
}

export interface CreateDiscountOptions {
  value: number;
  type: DiscountType;
}

export class Discount extends ValueObject<DiscountProps> {
  static Create({ type, value }: CreateDiscountOptions) {
    Guard.Create({ value: value, argumentName: "value" })
      .isPositive()
      .validate();

    return new Discount({ value, type });
  }

  get value(): DiscountProps {
    return this.props;
  }
}
