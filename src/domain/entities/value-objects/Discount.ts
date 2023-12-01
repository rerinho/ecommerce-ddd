import { Guard } from "../../../common/guard-clauses/GuardClauseBuilder";
import { ValueObject } from "../../../common/domain/ValueObject";

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
    Guard.Argument(value, "value").isPositive();

    return new Discount({ value, type });
  }

  get value(): number {
    return this.props.value;
  }

  get type(): DiscountType {
    return this.props.type;
  }
}
